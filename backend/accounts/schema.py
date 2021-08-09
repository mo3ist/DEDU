import graphene
from graphene.types import schema
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class User(DjangoObjectType):
	class Meta:
		model = UserModel
	
class Query(graphene.ObjectType):
	users = graphene.List(User)

	def resolve_users(obj, info, **kwargs):
		return UserModel.objects.all()

schema = graphene.Schema(query=Query)
