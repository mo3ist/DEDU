import graphene
import graphql_jwt
import graphql_social_auth
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
	social_auth = graphql_social_auth.relay.SocialAuthJWT.Field()
	token_auth = graphql_jwt.ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.Verify.Field()
	refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)