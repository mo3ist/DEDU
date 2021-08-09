import graphene
from core.schema import Query as CoreQuery
from accounts.schema import Query as AccountsQuery

class Query(
	CoreQuery,
	AccountsQuery,
	graphene.ObjectType
):
	pass
	

schema = graphene.Schema(query=Query)