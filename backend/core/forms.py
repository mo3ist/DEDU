from django import forms
from . import models

class ExtendedContentForm(forms.ModelForm):
	tags = forms.ModelMultipleChoiceField(queryset=models.Tag.objects.all(), required=False)

	class Meta:
		fields = '__all__'

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.fields['tags'].initial = self.instance.tag_set.all()

	def save(self, commit=True):
		# Prevent non-null errors on tag.contents.add(None)
		if not self.instance.pk:
			self.instance.save()
		
		# Add tags
		tags = self.cleaned_data.get('tags', None)
		for tag in tags:
			if tag not in self.instance.tag_set.all():
				print(self.instance)
				tag.contents.add(self.instance)
		return super().save(commit=commit)

class LectureForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Lecture

class QuestionForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Question

class AnswerForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Answer

class QuizForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Quiz

class SolutionForm(forms.ModelForm):
	class Meta:
		model = models.Solution
		fields = '__all__'

class ResourceForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Resource

class SummaryForm(ExtendedContentForm):
	class Meta(ExtendedContentForm.Meta):
		model = models.Summary

class ModForm(forms.ModelForm):
	class Meta:
		model = models.Mod
		fields = '__all__'

	state = forms.ChoiceField(choices=models.Mod.STATE, widget=forms.RadioSelect())

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
