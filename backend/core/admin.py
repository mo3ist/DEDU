from django.contrib import admin
from . import models
from . import forms

class LectureAdmin(admin.ModelAdmin):
	form = forms.LectureForm

class QuestionAdmin(admin.ModelAdmin):
	form = forms.QuestionForm

class AnswerAdmin(admin.ModelAdmin):
	form = forms.AnswerForm

class QuizAdmin(admin.ModelAdmin):
	form = forms.QuizForm

class ResourceAdmin(admin.ModelAdmin):
	form = forms.ResourceForm

class SummaryAdmin(admin.ModelAdmin):
	form = forms.SummaryForm

class ClassificationAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class CourseAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class TagAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class VoteAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class ModAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class AttachmentAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class TeacherAdmin(admin.ModelAdmin):
	list_display = ['__str__']

admin.site.register(models.Lecture, LectureAdmin)
admin.site.register(models.Question, QuestionAdmin)
admin.site.register(models.Answer, AnswerAdmin)
admin.site.register(models.Quiz, QuizAdmin)
admin.site.register(models.Resource, ResourceAdmin)
admin.site.register(models.Summary, SummaryAdmin)
admin.site.register(models.Classification, ClassificationAdmin)
admin.site.register(models.Course, CourseAdmin)
admin.site.register(models.Tag, TagAdmin)
admin.site.register(models.Vote, VoteAdmin)
admin.site.register(models.Mod, ModAdmin)
admin.site.register(models.Attachment, AttachmentAdmin)
admin.site.register(models.Teacher, TeacherAdmin)
