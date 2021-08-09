import graphene
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
	pass

schema = graphene.Schema(query=Query, mutation=Mutation)