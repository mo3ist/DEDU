import graphene
from graphene_permissions.mixins import AuthMutation
from graphene_permissions.permissions import AllowAuthenticated

from core import queries
from core import models as core_models
from core import serializers as core_serializers

class ContentObjectEnum(graphene.Enum):
	lecture = "lecture"
	question = "question"
	answer = "answer"
	quiz = "quiz"
	resource = "resource"
	summary = "summary"

class NestedAttachmentInput(graphene.InputObjectType):
	url = graphene.String(required=True)
	title = graphene.String(required=True)
	attm_type = graphene.String(required=True)
	
class CreateLecture(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	lecture = graphene.Field(queries.LectureType)
	
	class Input:
		title = graphene.String(required=True)
		lecture_type = graphene.Enum.from_enum(core_models.Lecture.LECTURE_TYPE)()
		body = graphene.String(required=True)
		mod = graphene.String()
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
	
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			lecture_serializer = core_serializers.LectureSerializer(data=input_data)
			if lecture_serializer.is_valid():
				lecture = lecture_serializer.save()
				return CreateLecture(lecture=lecture)
			raise Exception("Not valid.")
		return CreateLecture(lecture=None)

class CreateQuestion(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	question = graphene.Field(queries.QuestionType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			question_serializer = core_serializers.QuestionSerializer(data=input_data)
			if question_serializer.is_valid():
				question = question_serializer.save()
				return CreateQuestion(question=question)
			print(question_serializer.errors)
			raise Exception("Not valid.")
		return CreateQuestion(question=None)

class CreateAnswer(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	answer = graphene.Field(queries.AnswerType)

	class Input:
		question = graphene.Field(graphene.String, required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			answer_serializer = core_serializers.AnswerSerializer(data=input_data)
			if answer_serializer.is_valid():
				answer = answer_serializer.save()
				return CreateAnswer(answer=answer)
			print(answer_serializer.errors)
			raise Exception("Not valid.")
		return CreateAnswer(answer=None)

class CreateQuiz(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	quiz = graphene.Field(queries.QuizType)

	class Input:
		title = graphene.String(required=True)
		a = graphene.String()
		b = graphene.String()
		c = graphene.String()
		d = graphene.String()
		answer = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			quiz_serializer = core_serializers.QuizSerializer(data=input_data)
			if quiz_serializer.is_valid():
				quiz = quiz_serializer.save()
				return CreateQuiz(quiz=quiz)
			print(quiz_serializer.errors)
			raise Exception("Not valid.")
		return CreateQuiz(quiz=None)

class CreateSolution(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	solution = graphene.Field(queries.SolutionType)

	class Input:
		quiz = graphene.String(required=True)
		answer = graphene.String(required=True)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			solution_serializer = core_serializers.SolutionSerializer(data=input_data)
			if solution_serializer.is_valid():
				solution = solution_serializer.save()
				return CreateSolution(solution=solution)
			print(solution_serializer.errors)
			raise Exception("Not valid.")
		return CreateSolution(solution=None)

class CreateResource(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	resource = graphene.Field(queries.ResourceType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)
	
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			resource_serializer = core_serializers.ResourceSerializer(data=input_data)
			if resource_serializer.is_valid():
				resource = resource_serializer.save()
				return CreateResource(resource=resource)
			raise Exception("Not valid.")
		return CreateResource(resource=None)

class CreateSummary(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	summary = graphene.Field(queries.SummaryType)

	class Input:
		title = graphene.String(required=True)
		body = graphene.String(required=True)
		tag_set = graphene.List(graphene.String)
		course = graphene.String(required=True)
		mod = graphene.ID(required=False)


	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			summary_serializer = core_serializers.SummarySerializer(data=input_data)
			if summary_serializer.is_valid():
				summary = summary_serializer.save()
				return CreateSummary(summary=summary)
			raise Exception("Not valid.")
		return CreateSummary(summary=None)

class TagInput(graphene.InputObjectType):
	title = graphene.String(required=True)
	body = graphene.String(required=True)
	tag_type = graphene.Enum.from_enum(core_models.Tag.TAG_TYPE)(required=True)

class CreateTags(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	tags = graphene.Field(graphene.List(queries.TagType))

	class Input:
		tags = graphene.List(TagInput)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		course = graphene.String(required=True)

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			tags = []
			for tag in input_data["tags"]:
				try:
					tag = core_models.Tag.objects.get(title=tag.title)
				except:
					mod = core_models.Mod.objects.create()
					try:
						course = core_models.Course.objects.get(id=input_data["course"])
					except:
						raise Exception("Course dones't exist")
					tag = core_models.Tag.objects.create(
						title=tag.title,
						body=tag.body,
						tag_type=tag.tag_type,
						user = info.context.user,
						mod=mod,
						course=course
					)
				
				contents = {
					"lecture": core_models.Lecture,
					"question": core_models.Question,
					"answer": core_models.Answer,
					"quiz": core_models.Quiz,
					"resource": core_models.Resource,
					"summary": core_models.Summary 
				}
				try:
					content = contents[input_data["content_type"]].objects.get(
						id=input_data["content_object"]
					)
				except:
					raise contents[input_data["content_type"]].DoesNotExist()

				tag.contents.add(content)
				tags.append(tag)
			return CreateTags(tags=tags)
		return CreateTags(tags=None)

class CreateVote(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	vote = graphene.Field(queries.VoteType)

	class Input:
		value = graphene.String(required=True)
		content_id = graphene.ID(required=True)
		
	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		if cls.has_permission(root, info, input_data):
			input_data["user"] = info.context.user.id
			vote_serializer = core_serializers.VoteSerializer(data=input_data)
			if vote_serializer.is_valid():
				vote = vote_serializer.save()
				return CreateVote(vote=vote)
			raise Exception("Not valid.")
		return CreateVote(vote=None)

class CreateAttachment(AuthMutation, graphene.relay.ClientIDMutation):
	permission_classes = (AllowAuthenticated,)
	attachment = graphene.Field(queries.AttachmentType)

	class Input:
		url = graphene.String(required=True)
		title = graphene.String(required=True)
		attm_type = graphene.Enum.from_enum(core_models.Attachment.ATTM_TYPE)(required=True)
		content_type = ContentObjectEnum(required=True)
		content_object = graphene.String(required=True)
		
	def mutate_and_get_payload(obj, info, **input_data):
		# input_data["user"] = info.context.user.id
		# attachment_serializer = core_serializers.AttachmentSerializer(data=input_data)
		# if attachment_serializer.is_valid():
		# 	attachment = attachment_serializer.save()
		# 	return CreateAttachment(attachment=attachment)
		return CreateAttachment(attachment=None)
		