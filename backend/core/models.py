from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.db.models.query_utils import Q
from gm2m import GM2MField
from mptt.models import MPTTModel, TreeForeignKey
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

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
	reason = models.CharField(max_length=1000, null=True, blank=True)
	parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
	group_id = models.PositiveIntegerField(blank=True, null=True)
	history = models.BooleanField(default=False)

	@staticmethod
	def create_child_mod(parent_mod):
		mod = Mod.objects.create()
		if parent_mod:
			mod_leafnodes = parent_mod.get_leafnodes()
			if mod_leafnodes:
				mod.parent = mod_leafnodes[0]
			else:
				mod.parent = parent_mod
			mod.save()
		return mod 

	def save(self, *args, **kwargs):
		if self.id:
			if Mod.objects.get(id=self.id).state != self.state:
				self.date = timezone.now()
				if not self.by:
					raise Exception("Field 'by' needs to be populated.")
		super().save(*args, **kwargs)
		
@receiver(post_save, sender=Mod)
def populate_fields(sender, instance, **kwargs):
	Mod.objects.filter(id=instance.id).update(
		group_id=instance.get_root().id
	)
	if instance.state != Mod.PENDING:
		if instance.parent:
			Mod.objects.filter(id=instance.parent.id).update(history=True)

	# Creation
	if instance.parent:
		if instance.parent.state == Mod.PENDING:
			old_parent = instance.parent
			instance.move_to(instance.parent.parent)
			old_parent.delete()

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

	def save(self, *args, **kwargs):
		# Validations
		if not self.id:
			# dynamically get the query {model type: value}
			# NOTE: I named the reverse query the same as the model name but in nowercase 
			model_query = { str(self.content_object.__class__.__name__.lower()): self.content_object } 
			other = Vote.objects.filter(
				Q(**model_query),
				user=self.user, 
			)
			# save if other votes don't exist
			if not other:
				super().save(*args, **kwargs)

class Attachment(models.Model):

	class ATTM_TYPE(models.TextChoices):
		IMAGE = ("IMAGE", "Image")
		VIDEO = ("VIDEO", "Video")
		AUDIO = ("AUDIO", "Audio")
		DOCUMENT = ("DOCUMENT", "Document")

	url = models.URLField(null=True, blank=True)
	file = models.FileField(null=True, blank=True)
	title = models.CharField(max_length=100)
	attm_type = models.CharField(max_length=100, choices=ATTM_TYPE.choices)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) 

	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	content_object = GenericForeignKey()

	def __str__(self):
		return f"{self.attm_type}<{self.content_type}>: {str(self.content_object)}"

class Course(models.Model):
	title = models.CharField(max_length=500)
	description = models.TextField(max_length=500)
	attachments = GenericRelation(Attachment, related_query_name="course")
	code = models.CharField(max_length=15)
	outline = models.TextField(max_length=5000)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	
	def __str__(self):
		return self.title

class Classification(models.Model):
	FIRST_YEAR_GENERAL = "FIRST_YEAR_GENERAL"
	FIRST_YEAR_AI = "FIRST_YEAR_AI"
	FIRST_YEAR_SE = "FIRST_YEAR_SE"
	YEAR = [
		(FIRST_YEAR_GENERAL, "First Year - General"),
		(FIRST_YEAR_AI, "First Year - Artificail Intelligence"),
		(FIRST_YEAR_SE, "First Year - Software Engineering"),
	]
	
	year = models.CharField(
		default=FIRST_YEAR_GENERAL,
		choices=YEAR,
		max_length=100
	)
	courses = models.ManyToManyField(Course, null=True, blank=True)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

	def __str__(self):
		return self.year

class Teacher(models.Model):

	class TEACHER_TYPE(models.TextChoices):
		PROF = ("PROF", "Professor")
		ASSC_PROF = ("ASSC_PROF", "Associate Professor")
		TA = ("TA", "Teacher Assistant")

	teacher_type = models.CharField(max_length=20, choices=TEACHER_TYPE.choices, default=TEACHER_TYPE.PROF)
	title = models.CharField(max_length=100)
	courses = models.ManyToManyField(Course, null=True, blank=True, related_name="teachers")

	def __str__(self):
		return self.title

class Lecture(models.Model):

	class LECTURE_TYPE(models.TextChoices):
		LECTURE = ("LECTURE", "Lecture")
		SECTION = ("SECTION", "Section")

	title = models.CharField(max_length=500)
	lecture_type = models.CharField(max_length=20, choices=LECTURE_TYPE.choices, default=LECTURE_TYPE.LECTURE)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote, related_query_name="lecture")
	attachments = GenericRelation(Attachment, related_query_name="lecture")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Question(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote, related_query_name="question")
	attachments = GenericRelation(Attachment, related_query_name="question")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title

class Answer(models.Model):
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	title = models.CharField(max_length=500, null=True, blank=True)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote, related_query_name="answer")
	attachments = GenericRelation(Attachment, related_query_name="answer")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Quiz(models.Model):
	title = models.CharField(max_length=500, null=True, blank=True)
	a = models.CharField(max_length=250)
	b = models.CharField(max_length=250)
	c = models.CharField(max_length=250)
	d = models.CharField(max_length=250)
	answer = models.CharField(max_length=250)
	votes = GenericRelation(Vote, related_query_name="quiz")
	attachments = GenericRelation(Attachment, related_query_name="quiz")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class Resource(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote, related_query_name="resource")
	attachments = GenericRelation(Attachment, related_query_name="resource")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title

class Summary(models.Model):
	title = models.CharField(max_length=500)
	body = models.CharField(max_length=5000)
	votes = GenericRelation(Vote, related_query_name="summary")
	attachments = GenericRelation(Attachment, related_query_name="summary")
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title

class Tag(models.Model):
	
	class TAG_TYPE(models.TextChoices):
		SYLLABUS = ("SYLLABUS", "Syllabus")
		CHAPTER = ("CHAPTER", "Chapter")
		LECTURE = ("LECTURE", "Lecture")
		CONCEPT = ("CONCEPT", "Concept")
		OTHER = ("OTHER", "Other")

	title = models.CharField(max_length=250)
	body = models.CharField(max_length=5000, null=True)
	contents = GM2MField(Lecture, Question, Answer, Quiz, Resource, Summary)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	mod = models.OneToOneField(Mod, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	tag_type = models.CharField(max_length=50, choices=TAG_TYPE.choices)

	@property
	def get_contents(self):
		return self.contents.all()

	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		if not self.id:
			other = Tag.objects.filter(title=self.title, course=self.course)
			if other:
				raise Exception("A tag with the same name already exists.")
			super().save(*args, **kwargs)
