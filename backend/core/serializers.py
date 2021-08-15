from django.contrib.contenttypes import fields
from rest_framework import serializers
from generic_relations.relations import GenericRelatedField
from core import models 

class TagSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Tag
		fields = ("id", "title", "body", "user", "mod")

	id = serializers.CharField(required=False) 

class LectureSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Lecture
		fields = ("id", "title", "body", "link", "user", "tag_set", "mod")

	# GraphQL's ID is a string.
	# It's important to make required=False so mutations can user
	#serializers to create instanced, too.
	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField()
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all())

	def create(self, validated_data):
		print(validated_data)
		tag_set = validated_data.pop("tag_set")
		parent_mod = validated_data.pop("mod")
		print("parent", parent_mod)
		mod = models.Mod.objects.create()
		if parent_mod:
			mod_leafnodes = parent_mod.get_leafnodes()
			print("leafs ", mod_leafnodes)
			if mod_leafnodes:
				mod.parent = mod_leafnodes[0]
			else:
				mod.parent = parent_mod
			mod.save()

		lecture = models.Lecture.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(id=tag)
			except:
				raise Exception("error")
			tag.contents.add(lecture)
		return lecture

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Question
		fields = ("id", "title", "body", "user", "mod")

	id = serializers.CharField(required=False) 

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Answer
		fields = ("id", "question", "title", "body", "user", "mod")

	id = serializers.CharField(required=False) 
	
class QuizSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Quiz
		fields = ("id", "title", "a", "b", "c", "d", "answer", "user", "mod")

	id = serializers.CharField(required=False) 

class ResourceSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Resource
		fields = ("id", "title", "body", "user", "mod")

	id = serializers.CharField(required=False) 

class SummarySerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Summary
		fields = ("id", "title", "body", "user", "mod")

	id = serializers.CharField(required=False) 

class VoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Vote
		fields = ("id", "value", "content_type", "content_object", "user")

	id = serializers.CharField(required=False) 
	content_type = serializers.CharField()
	content_object = serializers.CharField()

	def create(self, validated_data):
		contents = {
			"lecture": models.Lecture,
			"question": models.Question,
			"answer": models.Answer,
			"quiz": models.Quiz,
			"resource": models.Resource,
			"summary": models.Summary 
		}
		content = contents[validated_data["content_type"]].objects.get(
			id=validated_data["content_object"]
		)
		vote = models.Vote.objects.create(
			value=validated_data["value"],
			user=validated_data["user"],
			content_object=content
		)
		return vote