import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from django.contrib.auth import get_user_model

from accounts import serializers

UserModel = get_user_model()

class UserType(DjangoObjectType):
	class Meta:
		model = UserModel

class UserMutation(SerializerMutation):
	class Meta:
		serializer_class = serializers.UserSerializer
		model_operations = ["create", "update"]
		lookup_field = "id"

	@classmethod
	def get_serializer_kwargs(cls, root, info, **input):
		if 'id' in input:
			instance = UserModel.objects.filter(
				id=input['id']
			).first()
			if instance:
				return {'instance': instance, 'data': input, 'partial': True}

			else:
				raise http.Http404

		return {'data': input, 'partial': True}


class Query(graphene.ObjectType):
	users = graphene.List(UserType)

	def resolve_users(obj, info, **kwargs):
		return UserModel.objects.all()

class Mutation(graphene.ObjectType):
	mutate_user = UserMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
