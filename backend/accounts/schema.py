import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from django.contrib.auth import get_user_model

from accounts import serializers

UserModel = get_user_model()

class UserType(DjangoObjectType):
	class Meta:
		model = UserModel

class UserInput(graphene.InputObjectType):
	email = graphene.String(required=True)
	password = graphene.String(required=True)

class CreateUser(graphene.Mutation):
	class Arguments:
		input_data = UserInput(required=True, name="input")

	user = graphene.Field(UserType)

	@staticmethod
	def mutate(obj, info, input_data):
		user_serializer = serializers.UserSerializer(data=input_data)
		if user_serializer.is_valid():
			user = user_serializer.save()
			return CreateUser(user=user)

class Query(graphene.ObjectType):
	users = graphene.List(UserType)

	def resolve_users(obj, info, **kwargs):
		return UserModel.objects.all()

class Mutation(graphene.ObjectType):
	create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
