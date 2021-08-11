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

class TagInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	user = graphene.String(required=True)

class LectureType(DjangoObjectType):
	class Meta:
		model = core_models.Lecture

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class LectureInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	link = graphene.String(required=True)
	user = graphene.String(required=True)
	tag_set = graphene.List(TagInput)

class CreateLecture(graphene.Mutation):
	class Arguments:
		input_data = LectureInput(required=True, name="input")

	lecture = graphene.Field(LectureType)

	@staticmethod
	def mutate(obj, info, input_data):
		print(input_data)
		# lecture_serializer = core_serializers.LectureSerializer(data=input_data)
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

class QuestionMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.QuestionSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Question.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}


class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class AnswerMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.AnswerSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Answer.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class QuizMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.QuizSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Quiz.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class ResourceMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.ResourceSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Resource.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class SummaryMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.SummarySerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Summary.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

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

class TagMutation(SerializerMutation):
	class Meta:
		serializer_class = core_serializers.TagSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Tag.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote

	content_object = graphene.List(ContentsType)

class VoteMutation(SerializerMutation):
	class Meta:
		convert_choices_to_enum = False
		serializer_class = core_serializers.VoteSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = core_models.Vote.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}

class Query(graphene.ObjectType):
	lectures = graphene.List(LectureType)
	questions = graphene.List(QuestionType)
	answers = graphene.List(AnswerType)
	quizzes = graphene.List(QuizType)
	resources = graphene.List(ResourceType)
	summaries = graphene.List(SummaryType)
	votes = graphene.List(VoteType)
	tags = graphene.List(TagType)

	def resolve_lectures(obj, info, **kwargs):
		return core_models.Lecture.objects.filter(mod__state=core_models.Mod.APPROVED)

	def resolve_questions(obj, info, **kwargs):
		return core_models.Question.objects.all()
	
	def resolve_answers(obj, info, **kwargs):
		return core_models.Answer.objects.all()
	
	def resolve_quizzes(obj, info, **kwargs):
		return core_models.Quiz.objects.all()

	def resolve_resources(obj, info, **kwargs):
		return core_models.Resource.objects.all()
	
	def resolve_summaries(obj, info, **kwargs):
		return core_models.Summary.objects.all()
	
	def resolve_votes(obj, info, **kwargs):
		return core_models.Vote.objects.all()

	def resolve_tags(obj, info, **kwargs):
		return core_models.Tag.objects.all()

class Mutation(graphene.ObjectType):
	createLecture = CreateLecture.Field()
	mutate_question = QuizMutation.Field()
	mutate_answer = AnswerMutation.Field()
	mutate_quiz = QuizMutation.Field()
	mutate_resource = ResourceMutation.Field()
	mutate_summary = SummaryMutation.Field()
	mutate_vote = VoteMutation.Field()
	mutate_tag = TagMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
