import django_filters
from django.db.models import Q

from core import models as core_models
from accounts import models as accounts_models


class AttachmentFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Attachment
		fields = ("url", "title","attm_type", "user")

class TagFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Tag
		fields = ("title", "body", "tag_type", "user", "course__code")

	title = django_filters.CharFilter(lookup_expr='icontains')
	course__code = django_filters.CharFilter(lookup_expr='iexact')

	@property
	def qs(self):
		if self.data.get('title', None):
			# Order by title
			return super().qs.order_by('title') 		
		
		return super().qs

class ModFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Mod
		fields = ("by", "state", "date")

class ClassificationFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Classification
		fields = ("code", "title", "courses")

class CourseFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Course
		fields = ("id", "title", "outline", "code")

class TeacherFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Teacher
		fields = ("title",)

class LectureFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Lecture
		fields = ("id", "title", "body", "user", "course", "lecture_type", "tag__title", "tag__course__code", "course__code")  # YES! you can use reverse GM2M relations here!

	tag__title = django_filters.CharFilter(lookup_expr='icontains')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	@property
	def qs(self):
		if self.data.get('tag__title', None):
			# Order by title
			return super().qs.order_by('tag__title')
		
		return super().qs.distinct()

class GenericContentFilter(django_filters.FilterSet):
	tag__title = django_filters.CharFilter(method='filter_tag__title')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)

	class Meta:
		# Operations will be easier as a list
		fields = [
			"id", 
			"title", 
			"user", 
			"course", 
			"tag__title", 
			"tag__course__code", 
			"course__code"
		]

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		q = Q()
		for title in value.split(','):
			q |= Q(tag__title=title)

		return queryset.filter(q).distinct()

	@property
	def qs(self):
		# '.distinct()' is a hack to prevent unexpected duplications
		qs = super().qs.distinct()

		user = self.request.user

		# (is owned by user or approved) and not history
		q = Q( Q( Q(user__id=user.id) | Q(mod__state=core_models.Mod.APPROVED) ) & Q(mod__history=False) )
		qs = qs.filter(q)

		# Sort by upvotes
		get_upvotes = lambda x:  core_models.Vote.objects.filter(**{x._meta.model.__name__.lower():x}, value=core_models.Vote.UPVOTE).count()
		get_downvotes = lambda x:  core_models.Vote.objects.filter(**{x._meta.model.__name__.lower():x}, value=core_models.Vote.DOWNVOTE).count()
		upvote_sorted_qs = sorted(qs, key=lambda x: get_upvotes(x) - get_downvotes(x), reverse=True)
		personalized_sorted_qs = sorted(upvote_sorted_qs, key=lambda q: q.mod.state, reverse=True)
		return personalized_sorted_qs

class QuestionFilter(GenericContentFilter):
	class Meta(GenericContentFilter.Meta):
		model = core_models.Question

class AnswerFilter(GenericContentFilter):
	class Meta(GenericContentFilter.Meta):
		model = core_models.Answer
		fields = list(filter(lambda x: x not in ["title"], GenericContentFilter.Meta.fields + ["question"]))

class QuizFilter(GenericContentFilter):
	class Meta(GenericContentFilter.Meta):
		model = core_models.Quiz

class SolutionFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Solution
		fields = ("id", "quiz", "user", "answer", "correct")

class ResourceFilter(GenericContentFilter):
	class Meta(GenericContentFilter.Meta):
		model = core_models.Resource

class SummaryFilter(GenericContentFilter):
	class Meta(GenericContentFilter.Meta):
		model = core_models.Summary

class VoteFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Vote
		fields = ("value", "user")
