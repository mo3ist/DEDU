import graphene
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from graphene_django.filter import DjangoFilterConnectionField
from pathlib import Path
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from gm2m import GM2MField
from django.contrib.auth import get_user_model
from django.db.models import Q

from core import models as core_models
from core import filters

# https://github.com/graphql-python/graphene-django/issues/636
class ExtendedConnection(graphene.relay.Connection):
	class Meta:
		abstract = True
	
	@classmethod
	def __init_subclass_with_meta__(cls, node=None, name=None, **options):
		result = super().__init_subclass_with_meta__(node=node, name=name, **options)

		cls._meta.fields["total_count"] = graphene.Field(
			type=graphene.Int, 
			name="totalCount",
			description="Number of items in the queryset.",
			required=True,
			resolver=cls.resolve_total_count
		)

		return result

	def resolve_total_count(self, *_):
		print(self.iterable)
		return len(self.iterable)

class ModType(DjangoObjectType):
	class Meta:
		model = core_models.Mod
		interfaces = (graphene.relay.Node,)

class ClassificationType(DjangoObjectType):
	class Meta:
		model = core_models.Classification
		interfaces = (graphene.relay.Node,)

class CourseType(DjangoObjectType):
	class Meta:
		model = core_models.Course
		interfaces = (graphene.relay.Node,)

	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	contribs = graphene.Int()
	contribs_users = graphene.Int()
	teachers = DjangoFilterConnectionField('core.queries.TeacherType', filterset_class=filters.TeacherFilter)
	lectures_count = graphene.Int()
	questions_count = graphene.Int()
	answers_count = graphene.Int()
	quizzes_count = graphene.Int()
	resources_count = graphene.Int()
	summaries_count = graphene.Int()

	def resolve_lectures_count(obj, info, **kwargs):
		return obj.lecture_set.all().count()
	
	def resolve_questions_count(obj, info, **kwargs):
		return obj.question_set.all().count()
	
	def resolve_answers_count(obj, info, **kwargs):
		return obj.answer_set.all().count()
	
	def resolve_quizzes_count(obj, info, **kwargs):
		return obj.quiz_set.all().count()
	
	def resolve_resources_count(obj, info, **kwargs):
		return obj.resource_set.all().count()
	
	def resolve_summaries_count(obj, info, **kwargs):
		return obj.summary_set.all().count()

	def resolve_attachment_set(obj, info, **kwargs):
		"return the current object's attachments"
		return core_models.Attachment.objects.filter(
			course = obj
		)
	
	def resolve_contribs(obj, info, **kwargs):
		contents = {
				"lecture": core_models.Lecture,
				"question": core_models.Question,
				"answer": core_models.Answer,
				"quiz": core_models.Quiz,
				"resource": core_models.Resource,
				"summary": core_models.Summary 
		}

		total = 0
		for Model in contents.values():
			total += Model.objects.filter(course=obj).count()

		return total

	def resolve_contribs_users(obj, info, **kwargs):
		User = get_user_model()

		contents_query_names = {
			"lecture": "lecture__course",
			"question": "question__course",
			"answer": "answer__course",
			"quiz": "quiz__course",
			"resource": "resource__course",
			"summary": "summary__course" 
		}

		query = Q()
		# OR the contents queries (get all the (unique) users that contributed)
		for qn in contents_query_names.values():
			query |= Q(**{qn: obj})	 

		return User.objects.filter(query).distinct().count()

class TeacherType(DjangoObjectType):
	class Meta:
		model = core_models.Teacher
		interfaces = (graphene.relay.Node,)

class LectureType(DjangoObjectType):
	class Meta:
		model = core_models.Lecture
		interfaces = (graphene.relay.Node,)

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	mod = graphene.Field('core.schema.ModType')

	question_count = graphene.Int()
	summary_count = graphene.Int()
	resource_count = graphene.Int()

	def resolve_question_count(obj, info, **kwargs):
		"Has a tag with the same title as the lecture"
		return core_models.Question.objects.filter(tag__title=obj.title, course=obj.course).count()
	
	def resolve_summary_count(obj, info, **kwargs):
		"Has a tag with the same title as the lecture"
		return core_models.Summary.objects.filter(tag__title=obj.title, course=obj.course).count()
	
	def resolve_resource_count(obj, info, **kwargs):
		"Has a tag with the same title as the lecture"
		return core_models.Resource.objects.filter(tag__title=obj.title, course=obj.course).count()

	def resolve_tag_set(obj, info, **kwargs):
		"return the current object's tags"
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		"return the current object's attachments"
		return core_models.Attachment.objects.filter(
			lecture = obj
		)

class QuestionType(DjangoObjectType):
	class Meta:
		model = core_models.Question
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)

	vote_count = graphene.Int()
	answer_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user = info.context.user
		user_vote_query = core_models.Vote.objects.filter(user__id=user.id, question=obj).first()
		if user_vote_query:
			return user_vote_query.value
		else:
			return None

	def resolve_vote_count(obj, info, **kwargs):
		return obj.votes.filter(value=core_models.Vote.UPVOTE).count() - obj.votes.filter(value=core_models.Vote.DOWNVOTE).count()

	def resolve_answer_count(obj, info, **kwargs):
		return obj.answer_set.all().count()

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			question = obj
		)

class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user = info.context.user
		user_vote_query = core_models.Vote.objects.filter(user__id=user.id, answer=obj).first()
		if user_vote_query:
			return user_vote_query.value
		else:
			return None

	def resolve_vote_count(obj, info, **kwargs):
		return obj.votes.filter(value=core_models.Vote.UPVOTE).count() - obj.votes.filter(value=core_models.Vote.DOWNVOTE).count()

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			answer = obj
		)

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz
		connection_class = ExtendedConnection
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user = info.context.user
		user_vote_query = core_models.Vote.objects.filter(user__id=user.id, quiz=obj).first()
		if user_vote_query:
			return user_vote_query.value
		else:
			return None

	def resolve_vote_count(obj, info, **kwargs):
		return obj.votes.filter(value=core_models.Vote.UPVOTE).count() - obj.votes.filter(value=core_models.Vote.DOWNVOTE).count()

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			quiz = obj
		)

	def resolve_solution_set(obj, info, **kwargs):
		# Only user's
		return core_models.Solution.objects.filter(quiz=obj, user__id=info.context.user.id)

class SolutionType(DjangoObjectType):
	class Meta:
		model = core_models.Solution
		interfaces = (graphene.relay.Node,)


class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user = info.context.user
		user_vote_query = core_models.Vote.objects.filter(user__id=user.id, resource=obj).first()
		if user_vote_query:
			return user_vote_query.value
		else:
			return None
	def resolve_vote_count(obj, info, **kwargs):
		return obj.votes.filter(value=core_models.Vote.UPVOTE).count() - obj.votes.filter(value=core_models.Vote.DOWNVOTE).count()

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			resource = obj
		)


class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.queries.TagType', filterset_class=filters.TagFilter)
	attachment_set = DjangoFilterConnectionField('core.queries.AttachmentType', filterset_class=filters.AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user = info.context.user
		user_vote_query = core_models.Vote.objects.filter(user__id=user.id, summary=obj).first()
		if user_vote_query:
			return user_vote_query.value
		else:
			return None
	def resolve_vote_count(obj, info, **kwargs):
		return obj.votes.filter(value=core_models.Vote.UPVOTE).count() - obj.votes.filter(value=core_models.Vote.DOWNVOTE).count()

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			summary = obj
		)

class ContentsType(graphene.Union):
	class Meta:
		types = (LectureType, QuestionType, AnswerType, QuizType, ResourceType, SummaryType)

# Registering the GM2MField in graphene (must be defined before the DjangoObjectType Tag)
# https://stackoverflow.com/a/51035755
@convert_django_field.register(GM2MField)
def convert_field_to_string(field, registry=None):
    return graphene.List(ContentsType, source='get_contents') # 'get_contents' is a property in the model 'Tag'.

class TagType(DjangoObjectType):
	class Meta:
		model = core_models.Tag
		interfaces = (graphene.relay.Node,)

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

class AttachmentType(DjangoObjectType):
	class Meta:
		model = core_models.Attachment
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

	def resolve_file(obj, info, **kwargs):
		"return full url"
		domain = get_current_site(info.context).domain
		img_path = Path(settings.MEDIA_URL, str(obj.file))
		return f"http://{domain}{img_path}"
