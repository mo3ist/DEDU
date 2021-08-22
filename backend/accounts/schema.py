import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from django.contrib.auth import get_user_model
import django_filters
from graphene_django.filter import DjangoFilterConnectionField
from accounts import serializers

UserModel = get_user_model()

class UserFilter(django_filters.FilterSet):
	class Meta:
		model = UserModel
		fields = ("email", )

class UserType(DjangoObjectType):
	class Meta:
		model = UserModel
		interfaces = (graphene.relay.Node,)

class CreateUser(graphene.relay.ClientIDMutation):
	user = graphene.Field(UserType)

	class Input:
		email = graphene.String(required=True)
		password = graphene.String(required=True)
	
	def mutate_and_get_payload(obj, info, **input_data):
		user_serializer = serializers.UserSerializer(data=input_data)
		if user_serializer.is_valid():
			user = user_serializer.save()
			return CreateUser(user=user)

class Query(graphene.ObjectType):
	user = graphene.relay.node.Field(UserType)
	users = DjangoFilterConnectionField(UserType, filterset_class=UserFilter)

class Mutation(graphene.ObjectType):
	create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
