import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import QnAListItem from "./qna-list-item";
import { GetQnAs } from "./__generated__/GetQnAs";
import { useParams } from "react-router";
import GenericListItem from "../../common/components/generic-list/generic-list-item";

interface Props {
	tags: Array<String> | null
}

const GET_QNAS = gql `
	query GetQnAs($first: Int, $after: String, $tag_Title: String, $course_Code: String) {
		questions(first: $first, after: $after, tag_Title: $tag_Title, tag_Course_Code: $course_Code, course_Code: $course_Code) {
			edges {
				node {
					id
					title 
					voteCount
					userVote
					answerCount
					created
					tagSet(course_Code: $course_Code) {
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
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`

const QnAList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const course_Code = useParams<{ course: string }>().course
	const [getQnAs, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQnAs>(GET_QNAS, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(","),
			course_Code: course_Code
		}
	});

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div
			className="h-full w-full text-secondary"
		>		
			<div
				className="grid grid-cols-1 gap-8"
			>
				{data?.questions?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<GenericListItem content={edge.node} />
						</div> 

					)
				})}

				{data?.questions?.pageInfo.hasNextPage ? <button
					className="h-20 w-full bg-primary rounded-sm font-semid text-3xl"
					onClick={() => {
						fetchMore!({
							variables: {
								after: data?.questions?.pageInfo.endCursor
							}
						})
					}}
				>
					المزيد
				</button> : 
				<button
					className="h-20 w-full bg-primary rounded-sm font-semid text-3xl opacity-50 cursor-not-allowed"
				>
					المزيد
				</button>
				}
			</div>
		</div>
	)
}

export default QnAList;