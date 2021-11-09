import React from "react"
import { useParams } from "react-router"
import { gql, useQuery } from "@apollo/client"

import { DetailedParams } from "../../common/interfaces/params" 
import GenericDetail from "../../common/components/generic-detail/generic-detail"
import Loading from "../../common/components/loading/loading"
import { GetDetailedResource } from "./__generated__/GetDetailedResource"

interface Props {

}

const GET_DETAILED_RESOURCE = gql`
	query GetDetailedResource($id: ID) {
		resources(id: $id) {
			edges {
				node {
					id
					title
					body
					created
					voteCount
					tagSet {
						edges {
							node {
								title
								tagType
							}
						}
					}
				}
			}
		}
	}
`

const ResourceDetail: React.FC<Props> = () => {
	
	const { course: courseCode, id } = useParams<DetailedParams>()
	const { loading, error, data } = useQuery<GetDetailedResource>(GET_DETAILED_RESOURCE, {
		variables: {
			id: id
		}
	})
	const resource = data?.resources?.edges[0]?.node

	return (
		<div
			className="relative"
		>
			{loading && <Loading />}

			<GenericDetail
				content={resource!}
			/>
		</div>
	)
}

export default ResourceDetail