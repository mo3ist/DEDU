import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import SummaryListingItem from "./summary-list-item";
import { GetSummaries as GetSummaries } from "./__generated__/GetSummaries";
import { useParams } from "react-router";

interface Props {
	tags: Array<String> | null
}

const GET_SUMMARIES = gql `
	query GetSummaries($first: Int, $after: String, $tag_Title: String, $course_Code: String) {
		summaries (first: $first, after: $after, tag_Title: $tag_Title, tag_Course_Code: $course_Code, course_Code: $course_Code) {
			edges {
				node {
					title 
					voteCount
					created
					tagSet(course_Code: $course_Code) {
						edges {
							node {
								title
								tagType
							}
						}
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

const SummaryList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const course_Code = useParams<{ course: string }>().course
	console.log(course_Code)
	const [getSummaries, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetSummaries>(GET_SUMMARIES, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(","),
			course_Code: course_Code
		}
	});

	useEffect(() => {
		getSummaries()
	}, [])

	return (
		<div
			className="h-full w-full text-secondary"
		>		
			<div
				className="grid grid-cols-1 gap-8"
			>
				{data?.summaries?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<SummaryListingItem summary={edge} />
						</div> 

					)
				})}

				{data?.summaries?.pageInfo.hasNextPage ? <button
					className="h-20 w-full bg-primary rounded-sm font-semid text-3xl"
					onClick={() => {
						fetchMore!({
							variables: {
								after: data?.summaries?.pageInfo.endCursor
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

export default SummaryList;