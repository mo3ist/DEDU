import graphene
import graphql_jwt
from core import schema as core_schema
from accounts import schema as accounts_schema

class Query(
	core_schema.Query,
	accounts_schema.Query,
	graphene.ObjectType
):
	pass

class Mutation(
	core_schema.Mutation,
	accounts_schema.Mutation,
	graphene.ObjectType
):
	token_auth = graphql_jwt.ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.Verify.Field()
	refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)