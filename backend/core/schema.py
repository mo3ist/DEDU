from django.contrib.contenttypes import fields
import graphene
from graphene.types import schema
from graphene_django import DjangoObjectType
from graphene_django.converter import convert_django_field
from gm2m import GM2MField

from core import models

class Lecture(DjangoObjectType):
	class Meta:
		model = models.Lecture

	# Using 'core.schema.Tag' is the solution to the
	# circular dependency between Tag and rest of Tag.contents' Models
	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Question(DjangoObjectType):
	class Meta:
		model = models.Question

	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Answer(DjangoObjectType):
	class Meta:
		model = models.Answer

	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Quiz(DjangoObjectType):
	class Meta:
		model = models.Quiz

	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Resource(DjangoObjectType):
	class Meta:
		model = models.Resource

	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Summary(DjangoObjectType):
	class Meta:
		model = models.Summary

	tag_set = graphene.List('core.schema.Tag')	

	def resolve_tag_set(obj, info, **kwargs):
		return obj.tag_set.all()

class Vote(DjangoObjectType):
	class Meta:
		model = models.Vote

class Contents(graphene.Union):
	class Meta:
		types = (Lecture, Question, Answer, Quiz, Resource, Summary)

# Registering the GM2MField in graphene (must be defined before the DjangoObjectType Tag)
# https://stackoverflow.com/a/51035755
@convert_django_field.register(GM2MField)
def convert_field_to_string(field, registry=None):
    return graphene.List(Contents, source='get_contents') # 'get_contents' is a property in the model 'Tag'.

class Tag(DjangoObjectType):
	class Meta:
		model = models.Tag

class Query(graphene.ObjectType):
	lectures = graphene.List(Lecture)
	questions = graphene.List(Question)
	answers = graphene.List(Answer)
	quizzes = graphene.List(Quiz)
	resources = graphene.List(Resource)
	summaries = graphene.List(Summary)
	votes = graphene.List(Vote)
	tags = graphene.List(Tag)

	def resolve_lectures(obj, info, **kwargs):
		return models.Lecture.objects.all()
	
	def resolve_questions(obj, info, **kwargs):
		return models.Question.objects.all()
	
	def resolve_answers(obj, info, **kwargs):
		return models.Answer.objects.all()
	
	def resolve_quizzes(obj, info, **kwargs):
		return models.Quiz.objects.all()

	def resolve_resources(obj, info, **kwargs):
		return models.Resource.objects.all()
	
	def resolve_summaries(obj, info, **kwargs):
		return models.Summary.objects.all()
	
	def resolve_votes(obj, info, **kwargs):
		return models.Vote.objects.all()

	def resolve_tags(obj, info, **kwargs):
		return models.Tag.objects.all()

schema = graphene.Schema(query=Query)
