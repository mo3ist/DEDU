from re import search
import graphene
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from graphene_django.filter import DjangoFilterConnectionField, GlobalIDFilter
from pathlib import Path
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from gm2m import GM2MField
import django_filters
from django.contrib.auth import get_user_model
from django.db.models import Q
from itertools import chain
from graphene_permissions.mixins import AuthMutation
from graphene_permissions.permissions import AllowAuthenticated

from core import models as core_models
from core import serializers as core_serializers
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
		fields = ("title", "body", "user", "course", "lecture_type", "tag__title", "tag__course__code", "course__code")  # YES! you can use reverse GM2M relations here!

	tag__title = django_filters.CharFilter(lookup_expr='icontains')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	@property
	def qs(self):
		if self.data.get('tag__title', None):
			# Order by title
			return super().qs.order_by('tag__title')
		
		return super().qs.distinct()

class QuestionFilter(django_filters.FilterSet):

	tag__title = django_filters.CharFilter(method='filter_tag__title')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	class Meta:
		model = core_models.Question
		fields = ("id", "title", "body", "user", "tag__title", "tag__course__code", "course__code")

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		q = Q()
		for title in value.split(','):
			q |= Q(tag__title=title)

		return queryset.filter(q).distinct()

	@property
	def qs(self):

		# This is a hack to prevent unexpected duplications
		return super().qs.distinct()

class AnswerFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Answer
		fields = ("question", "title", "body", "user", "course")

	@property
	def qs(self):

		# This is a hack to prevent unexpected duplications
		return super().qs.distinct()


class QuizFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Quiz
		fields = ("title", "user")

	@property
	def qs(self):

		# This is a hack to prevent unexpected duplications
		return super().qs.distinct()


class ResourceFilter(django_filters.FilterSet):

	tag__title = django_filters.CharFilter(method='filter_tag__title')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	class Meta:
		model = core_models.Resource
		fields = ("id", "title", "body", "user", "course", "tag__title", "tag__course__code", "course__code")

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		q = Q()
		for title in value.split(','):
			q |= Q(tag__title=title)

		return core_models.Resource.objects.filter(q).distinct()

	@property
	def qs(self):

		# This is a hack to prevent unexpected duplications
		return super().qs.distinct()


class SummaryFilter(django_filters.FilterSet):
	tag__title = django_filters.CharFilter(method='filter_tag__title')
	course__code = django_filters.CharFilter(lookup_expr='iexact')
	tag__course__code = django_filters.CharFilter(lookup_expr='iexact')	# The tag is unique together (title + course)

	class Meta:
		model = core_models.Summary
		fields = ("id", "title", "body", "user", "course", "tag__title", "tag__course__code", "course__code")

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		q = Q()
		for title in value.split(','):
			q |= Q(tag__title=title)

		return core_models.Summary.objects.filter(q).distinct()

	@property
	def qs(self):

		# This is a hack to prevent unexpected duplications
		return super().qs.distinct()

class VoteFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Vote
		fields = ("value", "user")

class ContentObjectEnum(graphene.Enum):
	lecture = "lecture"
	question = "question"
	answer = "answer"
	quiz = "quiz"
	resource = "resource"
	summary = "summary"

class NestedAttachmentInput(graphene.InputObjectType):
	url = graphene.String(required=True)
	title = graphene.String(required=True)
	attm_type = graphene.String(required=True)
	
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

	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	contribs = graphene.Int()
	contribs_users = graphene.Int()
	teachers = DjangoFilterConnectionField('core.schema.TeacherType', filterset_class=TeacherFilter)
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
	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
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

class CreateLecture(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	lecture = graphene.Field(LectureType)
	
	class Input:
		title = graphene.String(required=True)
		lecture_type = graphene.Enum.from_enum(core_models.Lecture.LECTURE_TYPE)()
		body = graphene.String(required=True)
		mod = graphene.String()
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
	
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			lecture_serializer = core_serializers.LectureSerializer(data=input_data)
			if lecture_serializer.is_valid():
				lecture = lecture_serializer.save()
				return CreateLecture(lecture=lecture)
			raise Exception("Not valid.")
		return CreateLecture(lecture=None)

class QuestionType(DjangoObjectType):
	class Meta:
		model = core_models.Question
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	vote_count = graphene.Int()
	answer_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user_vote_query = obj.votes.filter(user=info.context.user)
		if user_vote_query:
			return user_vote_query[0].value
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

class CreateQuestion(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	question = graphene.Field(QuestionType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			question_serializer = core_serializers.QuestionSerializer(data=input_data)
			if question_serializer.is_valid():
				question = question_serializer.save()
				return CreateQuestion(question=question)
			raise Exception("Not valid.")
		return CreateQuestion(question=None)

class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user_vote_query = obj.votes.filter(user=info.context.user)
		if user_vote_query:
			return user_vote_query[0].value
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
class CreateAnswer(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	answer = graphene.Field(AnswerType)

	class Input:
		question = graphene.Field(graphene.String)
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			answer_serializer = core_serializers.AnswerSerializer(data=input_data)
			if answer_serializer.is_valid():
				answer = answer_serializer.save()
				return CreateAnswer(answer=answer)
			raise Exception("Not valid.")
		return CreateAnswer(answer=None)

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user_vote_query = obj.votes.filter(user=info.context.user)
		if user_vote_query:
			return user_vote_query[0].value
		else:
			return None
	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			quiz = obj
		)

class CreateQuiz(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	quiz = graphene.Field(QuizType)

	class Input:
		title = graphene.String(required=True)
		a = graphene.String(required=True)
		b = graphene.String(required=True)
		c = graphene.String(required=True)
		d = graphene.String(required=True)
		answer = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			quiz_serializer = core_serializers.QuizSerializer(data=input_data)
			if quiz_serializer.is_valid():
				quiz = quiz_serializer.save()
				return CreateQuiz(quiz=quiz)
			raise Exception("Not valid.")
		return CreateQuiz(quiz=None)

class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user_vote_query = obj.votes.filter(user=info.context.user)
		if user_vote_query:
			return user_vote_query[0].value
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

class CreateResource(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	resource = graphene.Field(ResourceType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)
	
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			resource_serializer = core_serializers.ResourceSerializer(data=input_data)
			if resource_serializer.is_valid():
				resource = resource_serializer.save()
				return CreateResource(resource=resource)
			raise Exception("Not valid.")
		return CreateResource(resource=None)

class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	vote_count = graphene.Int()
	user_vote = graphene.String()

	def resolve_user_vote(obj, info, **kwargs):
		user_vote_query = obj.votes.filter(user=info.context.user)
		if user_vote_query:
			return user_vote_query[0].value
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

class CreateSummary(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	summary = graphene.Field(SummaryType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)


	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			summary_serializer = core_serializers.SummarySerializer(data=input_data)
			if summary_serializer.is_valid():
				summary = summary_serializer.save()
				return CreateSummary(summary=summary)
			raise Exception("Not valid.")
		return CreateSummary(summary=None)

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

class TagInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_type = graphene.Enum.from_enum(core_models.Tag.TAG_TYPE)(required=True)

class CreateTags(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	tags = graphene.Field(graphene.List(TagType))

	class Input:
		tags = graphene.List(TagInput)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		course = graphene.String(required=True)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			tags = []
			for tag in input_data["tags"]:
				try:
					tag = core_models.Tag.objects.get(title=tag.title)
				except:
					mod = core_models.Mod.objects.create()
					try:
						course = core_models.Course.objects.get(id=input_data["course"])
					except:
						raise Exception("Course dones't exist")
					tag = core_models.Tag.objects.create(
						title=tag.title,
						body=tag.body,
						tag_type=tag.tag_type,
						user = info.context.user,
						mod=mod,
						course=course
					)
				
				contents = {
					"lecture": core_models.Lecture,
					"question": core_models.Question,
					"answer": core_models.Answer,
					"quiz": core_models.Quiz,
					"resource": core_models.Resource,
					"summary": core_models.Summary 
				}
				try:
					content = contents[input_data["content_type"]].objects.get(
						id=input_data["content_object"]
					)
				except:
					raise contents[input_data["content_type"]].DoesNotExist()

				tag.contents.add(content)
				tags.append(tag)
			return CreateTags(tags=tags)
		return CreateTags(tags=None)

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

class CreateVote(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	vote = graphene.Field(VoteType)

	class Input:
		value = graphene.String(required=True)
		content_id = graphene.ID(required=True)
		
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			vote_serializer = core_serializers.VoteSerializer(data=input_data)
			if vote_serializer.is_valid():
				vote = vote_serializer.save()
				return CreateVote(vote=vote)
			raise Exception("Not valid.")
		return CreateVote(vote=None)

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

class CreateAttachment(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	attachment = graphene.Field(AttachmentType)

	class Input:
		url = graphene.String(required=True)
		title = graphene.String(required=True)
		attm_type = graphene.Enum.from_enum(core_models.Attachment.ATTM_TYPE)(required=True)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		
	def mutate_and_get_payload(obj, info, **input_data):
		# input_data["user"] = info.context.user.id
		# attachment_serializer = core_serializers.AttachmentSerializer(data=input_data)
		# if attachment_serializer.is_valid():
		# 	attachment = attachment_serializer.save()
		# 	return CreateAttachment(attachment=attachment)
		return CreateAttachment(attachment=None)
		
class Query(graphene.ObjectType):
	classification = graphene.relay.node.Field(ClassificationType)
	classifications = DjangoFilterConnectionField(ClassificationType, filterset_class=ClassificationFilter)
	
	course = graphene.relay.node.Field(CourseType)
	courses = DjangoFilterConnectionField(CourseType, filterset_class=CourseFilter)
	
	teacher = graphene.relay.node.Field(TeacherType)
	teachers = DjangoFilterConnectionField(TeacherType, filterset_class=TeacherFilter)

	attachment = graphene.relay.node.Field(AttachmentType)
	attachments = DjangoFilterConnectionField(AttachmentType, filterset_class=AttachmentFilter)

	lecture = graphene.relay.node.Field(LectureType)
	lectures = DjangoFilterConnectionField(LectureType, filterset_class=LectureFilter)

	question = graphene.relay.node.Field(QuestionType)
	questions = DjangoFilterConnectionField(QuestionType, filterset_class=QuestionFilter)

	answer = graphene.relay.node.Field(AnswerType)
	answers = DjangoFilterConnectionField(AnswerType, filterset_class=AnswerFilter)

	quiz = graphene.relay.node.Field(QuizType)
	quizzes = DjangoFilterConnectionField(QuizType, filterset_class=QuizFilter)

	resource = graphene.relay.node.Field(ResourceType)
	resources = DjangoFilterConnectionField(ResourceType, filterset_class=ResourceFilter)
	
	summary = graphene.relay.node.Field(SummaryType)
	summaries = DjangoFilterConnectionField(SummaryType, filterset_class=SummaryFilter)
	
	vote = graphene.relay.node.Field(VoteType)
	votes = DjangoFilterConnectionField(VoteType, filterset_class=VoteFilter)

	tag = graphene.relay.node.Field(TagType)
	tags = DjangoFilterConnectionField(TagType, filterset_class=TagFilter)

	mod = graphene.relay.node.Field(ModType)
	mods = DjangoFilterConnectionField(ModType, filterset_class=ModFilter)

class Mutation(graphene.ObjectType):
	create_lecture = CreateLecture.Field()
	create_question = CreateQuestion.Field()
	create_answer = CreateAnswer.Field()
	create_quiz = CreateQuiz.Field()
	create_resource = CreateResource.Field()
	create_summary = CreateSummary.Field()
	create_vote = CreateVote.Field()
	create_tags = CreateTags.Field()
	create_attachment = CreateAttachment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
