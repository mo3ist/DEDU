import React from "react"
import { useParams } from "react-router"
import { gql, useQuery } from "@apollo/client"

import { DetailedParams } from "../../common/interfaces/params" 
import { GetDetailedSummary } from "./__generated__/GetDetailedSummary"
import GenericDetail from "../../common/components/generic-detail/generic-detail"
import Loading from "../../common/components/loading/loading"

interface Props {

}

const GET_DETAILED_SUMMARY = gql`
	query GetDetailedSummary($id: ID) {
		summaries(id: $id) {
			edges {
				node {
					id
					title
					body
					created
					voteCount
					userVote
					tagSet {
						edges {
							node {
								title
								tagType
							}
						}
					}
					user {
						name 
						profilePicture
					}
				}
			}
		}
	}
`

const SummaryDetail: React.FC<Props> = () => {
	
	const { course: courseCode, id } = useParams<DetailedParams>()
	const { loading, error, data } = useQuery<GetDetailedSummary>(GET_DETAILED_SUMMARY, {
		variables: {
			id: id
		}
	})
	const summary = data?.summaries?.edges[0]?.node

	return (
		<div
			className="relative"
		>
			{loading && <Loading />}

			<GenericDetail
				content={summary!}
			/>
		</div>
	)
}

export default SummaryDetail