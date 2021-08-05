from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

class Tag(models.Model):
	title = models.CharField(max_length=250)
	body = models.CharField(max_length=5000, null=True)
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey()

class Vote(models.Model):
	UPVOTE = 'UPVOTE'
	DOWNVOTE = 'DOWNVOTE'
	VALUE = [
		(UPVOTE, 'Upvote'),
		(DOWNVOTE, 'Downvote')
	]
	value = models.CharField(
		max_length=8,
		choices=VALUE,
	)
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey()

class Lecture(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	link = models.URLField()
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)

class Question(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)

class Answer(models.Model):
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	title = models.CharField(max_length=500, null=True, blank=True)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)

class Quiz(models.Model):
	title = models.CharField(max_length=500, null=True, blank=True)
	a = models.CharField(max_length=250)
	b = models.CharField(max_length=250)
	c = models.CharField(max_length=250)
	d = models.CharField(max_length=250)
	answer = models.CharField(max_length=250)
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)

class Resource(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)

class Summary(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	tags = GenericRelation(Tag)
