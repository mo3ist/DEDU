from re import search
import graphene
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from graphene_django.filter import DjangoFilterConnectionField
from gm2m import GM2MField
import django_filters
from core import models as core_models
from core import serializers as core_serializers
from accounts import models as accounts_models

class ModFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Mod
		fields = ("by", "state", "date")

class ModType(DjangoObjectType):
	class Meta:
		model = core_models.Mod
		interfaces = (graphene.relay.Node,)

class LectureFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Lecture
		fields = ("title", "body", "link", "user")

class LectureType(DjangoObjectType):
	class Meta:
		model = core_models.Lecture
		interfaces = (graphene.relay.Node,)

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = graphene.List('core.schema.TagType')	
	mod = graphene.Field('core.schema.ModType')

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class CreateLecture(graphene.relay.ClientIDMutation):
	lecture = graphene.Field(LectureType)
	
	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		link = graphene.String(required=True)
		mod = graphene.String()
		tag_set = graphene.List(graphene.String)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		lecture_serializer = core_serializers.LectureSerializer(data=input_data)
		if lecture_serializer.is_valid():
			lecture = lecture_serializer.save()
			return CreateLecture(lecture=lecture)

class QuestionFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Question
		fields = ("title", "body", "user")

class QuestionType(DjangoObjectType):
	class Meta:
		model = core_models.Question
		interfaces = (graphene.relay.Node,)

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class CreateQuestion(graphene.relay.ClientIDMutation):
	question = graphene.Field(QuestionType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		question_serializer = core_serializers.QuestionSerializer(data=input_data)
		if question_serializer.is_valid():
			question = question_serializer.save()
			return CreateQuestion(question=question)

class AnswerFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Answer
		fields = ("question", "title", "body", "user")

class AnswerType(DjangoObjectType):
	class Meta:
		model = core_models.Answer
		interfaces = (graphene.relay.Node,)

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class CreateAnswer(graphene.relay.ClientIDMutation):
	answer = graphene.Field(AnswerType)

	class Input:
		question = graphene.Field(graphene.String)
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		answer_serializer = core_serializers.AnswerSerializer(data=input_data)
		if answer_serializer.is_valid():
			answer = answer_serializer.save()
			return CreateAnswer(answer=answer)

class QuizFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Quiz
		fields = ("title", "user")

class QuizType(DjangoObjectType):
	class Meta:
		model = core_models.Quiz
		interfaces = (graphene.relay.Node,)

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

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

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		quiz_serializer = core_serializers.QuizSerializer(data=input_data)
		if quiz_serializer.is_valid():
			quiz = quiz_serializer.save()
			return CreateQuiz(quiz=quiz)

class ResourceFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Resource
		fields = ("title", "body", "user")

class ResourceType(DjangoObjectType):
	class Meta:
		model = core_models.Resource
		interfaces = (graphene.relay.Node,)

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class CreateResource(graphene.relay.ClientIDMutation):
	resource = graphene.Field(ResourceType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
	
	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		resource_serializer = core_serializers.ResourceSerializer(data=input_data)
		if resource_serializer.is_valid():
			resource = resource_serializer.save()
			return CreateResource(resource=resource)

class SummaryFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Summary
		fields = ("title", "body", "user")

class SummaryType(DjangoObjectType):
	class Meta:
		model = core_models.Summary
		interfaces = (graphene.relay.Node,)

	tag_set = graphene.List('core.schema.TagType')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class CreateSummary(graphene.relay.ClientIDMutation):
	summary = graphene.Field(SummaryType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)

	def mutate_and_get_payload(obj, info, **input_data):
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

class TagFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Tag
		fields = ("title", "body", "user")

class TagType(DjangoObjectType):
	class Meta:
		model = core_models.Tag
		interfaces = (graphene.relay.Node,)

class CreateTag(graphene.relay.ClientIDMutation):
	tag = graphene.Field(TagType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		mod = graphene.String()

	def mutate_and_get_payload(obj, info, **input_data):
		input_data["user"] = info.context.user.id
		tag_serializer = core_serializers.TagSerializer(data=input_data)
		if tag_serializer.is_valid():
			tag = tag_serializer.save()
			return CreateTag(tag=tag)	

class VoteFilter(django_filters.FilterSet):
	class Meta:
		model = core_models.Vote
		fields = ("value", "user")

class VoteType(DjangoObjectType):
	class Meta:
		model = core_models.Vote
		interfaces = (graphene.relay.Node,)

	content_object = ContentsType()

class ContentObjectEnum(graphene.Enum):
	lecture = "lecture"
	question = "question"
	answer = "answer"
	quiz = "quiz"
	resource = "resource"
	summary = "summary"

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

class Query(graphene.ObjectType):
	# lectures = graphene.List(LectureType)
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

	# def resolve_lectures(obj, info, **kwargs):
	# 	return core_models.Lecture.objects.filter(mod__history=False)

	# def resolve_questions(obj, info, **kwargs):
	# 	return core_models.Question.objects.filter(mod__history=False)
	
	# def resolve_answers(obj, info, **kwargs):
	# 	return core_models.Answer.objects.filter(mod__history=False)
	
	# def resolve_quizzes(obj, info, **kwargs):
	# 	return core_models.Quiz.objects.filter(mod__history=False)

	# def resolve_resources(obj, info, **kwargs):
	# 	return core_models.Resource.objects.filter(mod__history=False)
	
	# def resolve_summaries(obj, info, **kwargs):
	# 	return core_models.Summary.objects.filter(mod__history=False)
	
	# def resolve_votes(obj, info, **kwargs):
	# 	return core_models.Vote.objects.all()

	# def resolve_tags(obj, info, **kwargs):
	# 	return core_models.Tag.objects.filter(mod__history=False)

	# def resolve_mods(obj, info, **kwargs):
	# 	return core_models.Mod.objects.all()

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
