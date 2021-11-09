import React from "react"
import { useParams } from "react-router"
import { gql, useQuery } from "@apollo/client"

import { DetailedParams } from "../../common/interfaces/params" 
import { GetDetailedQuestion } from "./__generated__/GetDetailedQuestion"
import GenericDetail from "../../common/components/generic-detail/generic-detail"
import Loading from "../../common/components/loading/loading"

interface Props {

}

const GET_DETAILED_QUESTION = gql`
	query GetDetailedQuestion($id: ID) {
		questions(id: $id) {
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

const QuestionDetail: React.FC<Props> = () => {
	
	const { course: courseCode, id } = useParams<DetailedParams>()
	const { loading, error, data } = useQuery<GetDetailedQuestion>(GET_DETAILED_QUESTION, {
		variables: {
			id: id
		}
	})
	const question = data?.questions?.edges[0]?.node

	return (
		<div
			className="relative"
		>
			{loading && <Loading />}

			<GenericDetail
				content={question!}
			/>
		</div>
	)
}

export default QuestionDetail