from django.contrib.contenttypes import fields
from rest_framework import serializers
from generic_relations.relations import GenericRelatedField
from core import models 

class AttachmentSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Attachment
		fields = ("id", "url", "title", "attm_type", "user", "content_type", "content_object")

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
		try:
			content = contents[validated_data.pop("content_type")].objects.get(
				id=validated_data.pop("content_object")
			)
		
		except: 
			raise Exception("Error getting 'Content'.")
		
		attachment = models.Attachment.objects.create(
			content_object=content,
			**validated_data
		)
		return attachment

class NestedAttachmentSerializer(serializers.Serializer):
	id = serializers.IntegerField(read_only=True)
	title = serializers.CharField()
	url = serializers.URLField()
	attm_type = serializers.ChoiceField(choices=models.Attachment.ATTM_TYPE.choices, default=models.Attachment.ATTM_TYPE.IMAGE)

class LectureSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Lecture
		fields = ("id", "title", "lecture_type", "body", "user", "tag_set", "mod", "course")

	# GraphQL's ID is a string.
	# It's important to make required=False so mutations can user
	#serializers to create instanced, too.
	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
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
		fields = ("id", "title", "body", "user", "tag_set", "mod", "course")

	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
		question = models.Question.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(id=tag)
			except:
				raise Exception("error")
			tag.contents.add(question)
		return question

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Answer
		fields = ("id", "question", "title", "body", "user", "tag_set", "mod", "course")

	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
		answer = models.Answer.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(id=tag)
			except:
				raise Exception("error")
			tag.contents.add(answer)
		return answer

class QuizSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Quiz
		fields = ("id", "title", "a", "b", "c", "d", "answer", "user", "tag_set", "mod", "course")

	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
		quiz = models.Quiz.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(id=tag)
			except:
				raise Exception("error")
			tag.contents.add(quiz)
		return quiz

class ResourceSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Resource
		fields = ("id", "title", "body", "user", "tag_set", "mod", "course", "attachment_set")

	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)
	attachment_set = NestedAttachmentSerializer(many=True, required=False)	# Used for nested attachment creation (just the needed fields)

	def create(self, validated_data):
		# attachment_set = validated_data.pop("attachment_set", [])
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
		user = validated_data["user"]
		resource = models.Resource.objects.create(mod=mod, **validated_data)
		
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(title=tag, course=validated_data["course"])
			except models.Tag.DoesNotExist:
				tag = models.Tag.objects.create(
					title=tag,
					body="",
					course=validated_data["course"],
					user=user,
					mod=models.Mod.objects.create(),
					tag_type=models.Tag.TAG_TYPE.CONCEPT
				)
			tag.contents.add(resource)
		
		# Nested Attachment creation 
		# for attachment in attachment_set:
		# 	atm = models.Attachment.objects.create(
		# 		content_object=resource,
		# 		user=user,
		# 		**attachment
		# 	)

		return resource

class SummarySerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Summary
		fields = ("id", "title", "body", "user", "tag_set", "mod", "course")

	id = serializers.CharField(required=False) 
	tag_set = serializers.ListField(
		child=serializers.CharField(),
		required=False
	)
	mod = serializers.PrimaryKeyRelatedField(queryset=models.Mod.objects.all(), required=False)

	def create(self, validated_data):
		tag_set = validated_data.pop("tag_set", [])
		mod = models.Mod.create_child_mod(validated_data.pop("mod", None))
		summary = models.Summary.objects.create(mod=mod, **validated_data)
		for tag in tag_set:
			try:
				tag = models.Tag.objects.get(id=tag)
			except:
				raise Exception("error")
			tag.contents.add(summary)
		return summary

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

