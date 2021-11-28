import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import SummaryListingItem from "./summary-list-item";
import { GetSummaries as GetSummaries } from "./__generated__/GetSummaries";
import { useHistory, useParams } from "react-router";
import GenericListItem from "../../common/components/generic-list/generic-list-item";
import classNames from "classnames";

interface Props {
	tags: Array<String> | null
}

const GET_SUMMARIES = gql `
	query GetSummaries($first: Int, $after: String, $tag_Title: String, $course_Code: String) {
		summaries (first: $first, after: $after, tag_Title: $tag_Title, tag_Course_Code: $course_Code, course_Code: $course_Code) {
			edges {
				node {
					id
					title 
					voteCount
					userVote
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

const SummaryList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const courseCode = useParams<{ course: string }>().course
	const [getSummaries, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetSummaries>(GET_SUMMARIES, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(","),
			course_Code: courseCode
		}
	});

	useEffect(() => {
		getSummaries()
	}, [])

	const history = useHistory()

	return (
		<div
			className="h-full w-full text-secondary rtl"
		>		
			<div
				className="w-full bg-secondary-200 mb-4 md:mb-8 rounded-b-lg flex flex-row items-center justify-start p-1 md:p-4"
			>
				<button
					className="bg-secondary-100 p-2 md:p-4 rounded-lg md:text-lg font-semibold"
					onClick={() => {
						history.push(`/courses/${courseCode}/summary/create/`)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
					</svg>
					إضافة ملخص
				</button>
			</div>
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				{data?.summaries?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<GenericListItem content={edge.node} />
						</div> 

					)
				})}

				{data?.summaries?.edges.length! > FIRST && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.summaries?.pageInfo.hasNextPage})}
						disabled={!data?.summaries?.pageInfo.hasNextPage}
					>
						المزيد
					</button>

				}
			</div>
		</div>
	)
}

export default SummaryList;