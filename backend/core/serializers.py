from django.contrib.contenttypes import fields
from rest_framework import serializers
from core import models 

class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Tag
		fields = ("id", "title", "body", "user")

	id = serializers.CharField(required=False) 

class LectureSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Lecture
		fields = ("id", "title", "body", "link", "user", "tag_set")

	# GraphQL's ID is a string.
	# It's important to make required=False so mutations can user
	#serializers to create instanced, too.
	id = serializers.CharField(required=False) 
	tag_set = TagSerializer(many=True)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set")
		mod = models.Mod.objects.create()
		lecture = models.Lecture.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			mod = models.Mod.objects.create()
			tag = models.Tag.objects.create(mod=mod, **tag)
			tag.contents.add(lecture)
		return lecture

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Question
		fields = ("id", "title", "body", "user")

	id = serializers.CharField(required=False) 

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Answer
		fields = ("id", "question", "title", "body", "user")

	id = serializers.CharField(required=False) 
	
class QuizSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Quiz
		fields = ("id", "title", "a", "b", "c", "d", "answer", "user")

	id = serializers.CharField(required=False) 

class ResourceSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Resource
		fields = ("id", "title", "body", "user")

	id = serializers.CharField(required=False) 

class SummarySerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Summary
		fields = ("id", "title", "body", "user")

	id = serializers.CharField(required=False) 

class VoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Vote
		fields = ("id", "value", "content_object", "user")

	id = serializers.CharField(required=False) 