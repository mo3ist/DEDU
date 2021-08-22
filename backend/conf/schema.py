import graphene
import graphql_jwt
from core.schema import Query as CoreQuery, Mutation as CoreMutation
from accounts.schema import Query as AccountsQuery, Mutation as AccountsMutation

class Query(
	CoreQuery,
	AccountsQuery,
	graphene.ObjectType
):
	pass

class Mutation(
	CoreMutation,
	AccountsMutation,
	graphene.ObjectType
):
	token_auth = graphql_jwt.ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.Verify.Field()
	refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)