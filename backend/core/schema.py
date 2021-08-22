from re import search
import graphene
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from graphene_django.rest_framework.mutation import SerializerMutation
from gm2m import GM2MField
import http

from core import models as core_models
from core import serializers as core_serializers
from accounts import models as accounts_models

class ModType(DjangoObjectType):
	class Meta:
		model = core_models.Mod

class TagInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	mod = graphene.String()

class LectureType(DjangoObjectType):
	class Meta:
		model = core_models.Lecture

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = graphene.List('core.schema.TagType')	
	mod = graphene.Field('core.schema.ModType')

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class LectureInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	link = graphene.String(required=True)
	# user = graphene.String(required=True)
	mod = graphene.String()
	tag_set = graphene.List(graphene.String)

class CreateLecture(graphene.Mutation):
	class Arguments:
		input_data = LectureInput(required=True, name="input")

	lecture = graphene.Field(LectureType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user
		lecture_serializer = core_serializers.LectureSerializer(data=input_data)
		if lecture_serializer.is_valid():
			lecture = lecture_serializer.save()
			return CreateLecture(lecture=lecture)

class QuestionType(DjangoObjectType):
	class Meta:
		model = core_models.Question

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class QuestionInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_set = graphene.List(graphene.String)

class CreateQuestion(graphene.Mutation):
	class Arguments:
		input_data = QuestionInput(required=True, name="input")

	question = graphene.Field(QuestionType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		question_serializer = core_serializers.QuestionSerializer(data=input_data)
		if question_serializer.is_valid():
			question = question_serializer.save()
			return CreateQuestion(question=question)

class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class AnswerInput(graphene.InputObjectType):
	question = graphene.Field(graphene.String)
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_set = graphene.List(graphene.String)

class CreateAnswer(graphene.Mutation):
	class Arguments:
		input_data = AnswerInput(required=True, name="input")

	answer = graphene.Field(AnswerType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		answer_serializer = core_serializers.AnswerSerializer(data=input_data)
		if answer_serializer.is_valid():
			answer = answer_serializer.save()
			return CreateAnswer(answer=answer)

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class QuizInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	a = graphene.String(required=True)
	b = graphene.String(required=True)
	c = graphene.String(required=True)
	d = graphene.String(required=True)
	answer = graphene.String(required=True)
	tag_set = graphene.List(graphene.String)

class CreateQuiz(graphene.Mutation):
	class Arguments:
		input_data = QuizInput(required=True, name="input")

	quiz = graphene.Field(QuizType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		quiz_serializer = core_serializers.QuizSerializer(data=input_data)
		if quiz_serializer.is_valid():
			quiz = quiz_serializer.save()
			return CreateQuiz(quiz=quiz)

class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class ResourceInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_set = graphene.List(graphene.String)

class CreateResource(graphene.Mutation):
	class Arguments:
		input_data = ResourceInput(required=True, name="input")

	resource = graphene.Field(ResourceType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		resource_serializer = core_serializers.ResourceSerializer(data=input_data)
		if resource_serializer.is_valid():
			resource = resource_serializer.save()
			return CreateResource(resource=resource)

class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class SummaryInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_set = graphene.List(graphene.String)

class CreateSummary(graphene.Mutation):
	class Arguments:
		input_data = SummaryInput(required=True, name="input")

	summary = graphene.Field(SummaryType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		summary_serializer = core_serializers.SummarySerializer(data=input_data)
		if summary_serializer.is_valid():
			summary = summary_serializer.save()
			return CreateSummary(summary=summary)

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

class CreateTag(graphene.Mutation):
	class Arguments:
		input_data = TagInput(required=True, name="input")

	tag = graphene.Field(TagType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		tag_serializer = core_serializers.TagSerializer(data=input_data)
		if tag_serializer.is_valid():
			tag = tag_serializer.save()
			return CreateTag(tag=tag)	

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote

	content_object = ContentsType()

class ContentObjectEnum(graphene.Enum):
	lecture = "lecture"
	question = "question"
	answer = "answer"
	quiz = "quiz"
	resource = "resource"
	summary = "summary"

class VoteInput(graphene.InputObjectType):
	value = graphene.String(required=True)
	content_type = ContentObjectEnum()
	content_object = graphene.String()
	tag_set = graphene.List(TagInput)

class CreateVote(graphene.Mutation):
	class Arguments:
		input_data = VoteInput(required=True, name="input")

	vote = graphene.Field(VoteType)

	@staticmethod
	def mutate(obj, info, input_data):
		input_data["user"] = info.context.user.id
		vote_serializer = core_serializers.VoteSerializer(data=input_data)
		if vote_serializer.is_valid():
			vote = vote_serializer.save()
			return CreateVote(vote=vote)

class Query(graphene.ObjectType):
	lectures = graphene.List(LectureType)
	questions = graphene.List(QuestionType)
	answers = graphene.List(AnswerType)
	quizzes = graphene.List(QuizType)
	resources = graphene.List(ResourceType)
	summaries = graphene.List(SummaryType)
	votes = graphene.List(VoteType)
	tags = graphene.List(TagType)
	mods = graphene.List(ModType)

	def resolve_lectures(obj, info, **kwargs):
		return core_models.Lecture.objects.filter(mod__history=False)

	def resolve_questions(obj, info, **kwargs):
		return core_models.Question.objects.filter(mod__history=False)
	
	def resolve_answers(obj, info, **kwargs):
		return core_models.Answer.objects.filter(mod__history=False)
	
	def resolve_quizzes(obj, info, **kwargs):
		return core_models.Quiz.objects.filter(mod__history=False)

	def resolve_resources(obj, info, **kwargs):
		return core_models.Resource.objects.filter(mod__history=False)
	
	def resolve_summaries(obj, info, **kwargs):
		return core_models.Summary.objects.filter(mod__history=False)
	
	def resolve_votes(obj, info, **kwargs):
		return core_models.Vote.objects.all()

	def resolve_tags(obj, info, **kwargs):
		return core_models.Tag.objects.filter(mod__history=False)

	def resolve_mods(obj, info, **kwargs):
		return core_models.Mod.objects.all()

class Mutation(graphene.ObjectType):
	create_lecture = CreateLecture.Field()
	create_question = CreateQuestion.Field()
	create_answer = CreateAnswer.Field()
	create_quiz = CreateQuiz.Field()
	create_resource = CreateResource.Field()
	create_summary = CreateSummary.Field()
	create_vote = CreateVote.Field()
	create_tag = CreateTag.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
