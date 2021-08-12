from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.db.models.query_utils import Q
from gm2m import GM2MField
from mptt.models import MPTTModel, TreeForeignKey

class Mod(MPTTModel):
	PENDING = "PENDING"
	APPROVED = "APPROVED"
	REJECTED = "REJECTED"
	STATE = [
		(PENDING, "Pending"),
		(APPROVED, "Approved"),
		(REJECTED, "Rejected")
	]

	state = models.CharField(choices=STATE, max_length=8, default=PENDING)
	by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
	date = models.DateTimeField(auto_now=True)
	parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')

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
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

	def __str__(self):
		return f"{self.value} #{self.id}"

class Lecture(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	link = models.URLField()
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Question(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Answer(models.Model):
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	title = models.CharField(max_length=500, null=True, blank=True)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Quiz(models.Model):
	title = models.CharField(max_length=500, null=True, blank=True)
	a = models.CharField(max_length=250)
	b = models.CharField(max_length=250)
	c = models.CharField(max_length=250)
	d = models.CharField(max_length=250)
	answer = models.CharField(max_length=250)
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Resource(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Summary(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Tag(models.Model):
	title = models.CharField(max_length=250)
	body = models.CharField(max_length=5000, null=True)
	contents = GM2MField(Lecture, Question, Answer, Quiz, Resource, Summary)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)

	@property
	def get_contents(self):
		return self.contents.all()

	def __str__(self):
		return self.title
