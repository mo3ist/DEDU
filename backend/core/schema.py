import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django import DjangoObjectType 

from core import filters

# Ok, so, if you did this:
# from core import queries
# and referred to types as queries.'TYPE'
# There will be an ImportError. (guess graphene wants everything in one place)
# So I didn't bother and just used the all-powerful '*'
from core.queries import *
from core.mutations import *

class Query(graphene.ObjectType):
	classification = graphene.relay.node.Field(ClassificationType)
	classifications = DjangoFilterConnectionField(ClassificationType, filterset_class=filters.ClassificationFilter)
	
	course = graphene.relay.node.Field(CourseType)
	courses = DjangoFilterConnectionField(CourseType, filterset_class=filters.CourseFilter)
	
	teacher = graphene.relay.node.Field(TeacherType)
	teachers = DjangoFilterConnectionField(TeacherType, filterset_class=filters.TeacherFilter)

	attachment = graphene.relay.node.Field(AttachmentType)
	attachments = DjangoFilterConnectionField(AttachmentType, filterset_class=filters.AttachmentFilter)

	lecture = graphene.relay.node.Field(LectureType)
	lectures = DjangoFilterConnectionField(LectureType, filterset_class=filters.LectureFilter)

	question = graphene.relay.node.Field(QuestionType)
	questions = DjangoFilterConnectionField(QuestionType, filterset_class=filters.QuestionFilter)

	answer = graphene.relay.node.Field(AnswerType)
	answers = DjangoFilterConnectionField(AnswerType, filterset_class=filters.AnswerFilter)

	quiz = graphene.relay.node.Field(QuizType)
	quizzes = DjangoFilterConnectionField(QuizType, filterset_class=filters.QuizFilter)

	solution = graphene.relay.node.Field(SolutionType)
	solutions = DjangoFilterConnectionField(SolutionType, filterset_class=filters.SolutionFilter)

	resource = graphene.relay.node.Field(ResourceType)
	resources = DjangoFilterConnectionField(ResourceType, filterset_class=filters.ResourceFilter)
	
	summary = graphene.relay.node.Field(SummaryType)
	summaries = DjangoFilterConnectionField(SummaryType, filterset_class=filters.SummaryFilter)
	
	vote = graphene.relay.node.Field(VoteType)
	votes = DjangoFilterConnectionField(VoteType, filterset_class=filters.VoteFilter)

	tag = graphene.relay.node.Field(TagType)
	tags = DjangoFilterConnectionField(TagType, filterset_class=filters.TagFilter)

	mod = graphene.relay.node.Field(ModType)
	mods = DjangoFilterConnectionField(ModType, filterset_class=filters.ModFilter)

class Mutation(graphene.ObjectType):
	create_lecture = CreateLecture.Field()
	create_question = CreateQuestion.Field()
	create_answer = CreateAnswer.Field()
	create_quiz = CreateQuiz.Field()
	create_solution = CreateSolution.Field()
	create_resource = CreateResource.Field()
	create_summary = CreateSummary.Field()
	create_vote = CreateVote.Field()
	create_tags = CreateTags.Field()
	create_attachment = CreateAttachment.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
