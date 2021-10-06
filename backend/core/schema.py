from re import search
import graphene
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from graphene_django.filter import DjangoFilterConnectionField
from gm2m import GM2MField
import django_filters
from django.contrib.auth import get_user_model
from django.db.models import Q
from itertools import chain

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
		fields = ("title", "body", "tag_type", "user", "course")

	title = django_filters.CharFilter(lookup_expr='icontains')

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
		fields = ("year", "courses")

class CourseFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Course
		fields = ("title", "outline", "code")

class LectureFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Lecture
		fields = ("title", "body", "user", "course", "tag__title")  # YES! you can use reverse GM2M relations here!

	tag__title = django_filters.CharFilter(lookup_expr='icontains')

	@property
	def qs(self):
		if self.data.get('tag__title', None):
			# Order by title
			return super().qs.order_by('tag__title') 		
		
		return super().qs

class QuestionFilter(django_filters.FilterSet):

	tag__title = django_filters.CharFilter(method='filter_tag__title')

	class Meta:
		model = core_models.Question
		fields = ("title", "body", "user", "course", "tag__title")

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		from cprint import cprint

		qs = core_models.Question.objects.none()
		for title in value.split(','):
			q = core_models.Question.objects.filter(Q(tag__title=title))
			cprint.info(q)
			qs = qs.union(q)
		
		return qs
		
	# @property
	# def qs(self):
	# 	return super().qs

class AnswerFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Answer
		fields = ("question", "title", "body", "user", "course")

class QuizFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Quiz
		fields = ("title", "user")

class ResourceFilter(django_filters.FilterSet):

	tag__title = django_filters.CharFilter(method='filter_tag__title')

	class Meta:
		model = core_models.Resource
		fields = ("title", "body", "user", "course", "tag__title")

	def filter_tag__title(self, queryset, name, value):
		"Support comma separated tags."
		from cprint import cprint

		qs = core_models.Resource.objects.none()
		for title in value.split(','):
			q = core_models.Resource.objects.filter(Q(tag__title=title))
			cprint.info(q)
			qs = qs.union(q)
		
		return qs

class SummaryFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Summary
		fields = ("title", "body", "user", "course")

class VoteFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Vote
		fields = ("value", "user")

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

class LectureType(DjangoObjectType):
	class Meta:
		model = core_models.Lecture
		interfaces = (graphene.relay.Node,)

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)
	mod = graphene.Field('core.schema.ModType')

	def resolve_tag_set(obj, info, **kwargs):
		"return the current object's tags"
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		"return the current object's attachments"
		return core_models.Attachment.objects.filter(
			lecture = obj
		)

class CreateLecture(graphene.relay.ClientIDMutation):
	lecture = graphene.Field(LectureType)
	
	class Input:
		title = graphene.String(required=True)
		lecture_type = graphene.Enum.from_enum(core_models.Lecture.LECTURE_TYPE)()
		body = graphene.String(required=True)
		mod = graphene.String()
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		lecture_serializer = core_serializers.LectureSerializer(data=input_data)
		if lecture_serializer.is_valid():
			lecture = lecture_serializer.save()
			return CreateLecture(lecture=lecture)

class QuestionType(DjangoObjectType):
	class Meta:
		model = core_models.Question
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			question = obj
		)

class CreateQuestion(graphene.relay.ClientIDMutation):
	question = graphene.Field(QuestionType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		question_serializer = core_serializers.QuestionSerializer(data=input_data)
		if question_serializer.is_valid():
			question = question_serializer.save()
			return CreateQuestion(question=question)

class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			answer = obj
		)
class CreateAnswer(graphene.relay.ClientIDMutation):
	answer = graphene.Field(AnswerType)

	class Input:
		question = graphene.Field(graphene.String)
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		answer_serializer = core_serializers.AnswerSerializer(data=input_data)
		if answer_serializer.is_valid():
			answer = answer_serializer.save()
			return CreateAnswer(answer=answer)

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			quiz = obj
		)

class CreateQuiz(graphene.relay.ClientIDMutation):
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

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		quiz_serializer = core_serializers.QuizSerializer(data=input_data)
		if quiz_serializer.is_valid():
			quiz = quiz_serializer.save()
			return CreateQuiz(quiz=quiz)

class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			resource = obj
		)

class CreateResource(graphene.relay.ClientIDMutation):
	resource = graphene.Field(ResourceType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
	
	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		resource_serializer = core_serializers.ResourceSerializer(data=input_data)
		if resource_serializer.is_valid():
			resource = resource_serializer.save()
			return CreateResource(resource=resource)

class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary
		interfaces = (graphene.relay.Node,)

	tag_set = DjangoFilterConnectionField('core.schema.TagType', filterset_class=TagFilter)
	attachment_set = DjangoFilterConnectionField('core.schema.AttachmentType', filterset_class=AttachmentFilter)

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

	def resolve_attachment_set(obj, info, **kwargs):
		return core_models.Attachment.objects.filter(
			summary = obj
		)

class CreateSummary(graphene.relay.ClientIDMutation):
	summary = graphene.Field(SummaryType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		summary_serializer = core_serializers.SummarySerializer(data=input_data)
		if summary_serializer.is_valid():
			summary = summary_serializer.save()
			return CreateSummary(summary=summary)

class ContentsType(graphene.Union):
	class Meta:
		types = (LectureType, QuestionType, AnswerType, QuizType, ResourceType, SummaryType)


class ContentObjectEnum(graphene.Enum):
	lecture = "lecture"
	question = "question"
	answer = "answer"
	quiz = "quiz"
	resource = "resource"
	summary = "summary"


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

class CreateTags(graphene.relay.ClientIDMutation):
	tags = graphene.Field(graphene.List(TagType))

	class Input:
		tags = graphene.List(TagInput)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		course = graphene.String(required=True)

	def mutate_and_get_payload(obj, info, **input_data):
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

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

class CreateVote(graphene.relay.ClientIDMutation):
	vote = graphene.Field(VoteType)

	class Input:
		value = graphene.String(required=True)
		content_type = ContentObjectEnum()
		content_object = graphene.String()
		
	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		vote_serializer = core_serializers.VoteSerializer(data=input_data)
		if vote_serializer.is_valid():
			vote = vote_serializer.save()
			return CreateVote(vote=vote)

class AttachmentType(DjangoObjectType):
	class Meta:
		model = core_models.Attachment
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

class CreateAttachment(graphene.relay.ClientIDMutation):
	attachment = graphene.Field(AttachmentType)

	class Input:
		url = graphene.String(required=True)
		title = graphene.String(required=True)
		attm_type = graphene.Enum.from_enum(core_models.Attachment.ATTM_TYPE)(required=True)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		
	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		attachment_serializer = core_serializers.AttachmentSerializer(data=input_data)
		if attachment_serializer.is_valid():
			attachment = attachment_serializer.save()
			return CreateAttachment(attachment=attachment)

class Query(graphene.ObjectType):
	classification = graphene.relay.node.Field(ClassificationType)
	classifications = DjangoFilterConnectionField(ClassificationType, filterset_class=ClassificationFilter)
	
	course = graphene.relay.node.Field(CourseType)
	courses = DjangoFilterConnectionField(CourseType, filterset_class=CourseFilter)

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
