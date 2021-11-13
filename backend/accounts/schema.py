import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from django.contrib.auth import get_user_model
import django_filters
from graphene_django.filter import DjangoFilterConnectionField
from accounts import serializers
import graphql_social_auth
from graphql_social_auth.types import SocialType

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

class ExtendedSocialAuthJWT(graphql_social_auth.relay.SocialAuthJWT):
	# Since I can have the name, profile pic, and other profile data from google at the frontend,
	# I'll just extend the SocialAuthJWT to edit the resultant User with google's profile data

	class Input:
		provider = graphene.String(required=True)
		access_token = graphene.String(required=True)
		name = graphene.String()
		profile_picture = graphene.String()

	@classmethod
	def mutate_and_get_payload(cls, root, info, **input_data):
		social_auth = super().mutate_and_get_payload(root, info, **input_data)
		user = social_auth.social.user

		# Add extra fields here
		user.name = input_data.get("name", None)
		user.profile_picture = input_data.get("profile_picture", None)
		user.save()

		return social_auth

class Query(graphene.ObjectType):
	user = graphene.relay.node.Field(UserType)
	users = DjangoFilterConnectionField(UserType, filterset_class=UserFilter)

class Mutation(graphene.ObjectType):
	create_user = CreateUser.Field()
	social_auth = ExtendedSocialAuthJWT.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
