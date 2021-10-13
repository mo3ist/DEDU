from django.contrib import admin
from . import models

class LectureAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class QuestionAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class AnswerAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class QuizAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class ResourceAdmin(admin.ModelAdmin):
	list_display = ['__str__']

class SummaryAdmin(admin.ModelAdmin):
	list_display = ['__str__']

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
