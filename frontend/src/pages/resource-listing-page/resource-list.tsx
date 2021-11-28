import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import ResourceListingItem from "./resource-list-item";
import { GetResources as GetResources } from "./__generated__/GetResources";
import { useHistory, useParams } from "react-router";
import GenericListItem from "../../common/components/generic-list/generic-list-item";
import classNames from "classnames";

interface Props {
	tags: Array<String> | null
}

const GET_RESOURCES = gql `
	query GetResources($first: Int, $after: String, $tag_Title: String, $course_Code: String) {
		resources (first: $first, after: $after, tag_Title: $tag_Title, tag_Course_Code: $course_Code, course_Code: $course_Code) {
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

const ResourceList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const courseCode = useParams<{ course: string }>().course
	const [getResources, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetResources>(GET_RESOURCES, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(","),
			course_Code: courseCode
		}
	});

	useEffect(() => {
		getResources()
	}, [])

	const history = useHistory()
	return (
		<div
			className="h-full w-full text-secondary rtl"
		>	
			<div
				className="w-full h-20 bg-secondary-200 mb-4 md:mb-8 rounded-b-lg flex flex-row items-center justify-start px-4"
			>
				<button
					className="bg-secondary-100 p-4 rounded-lg text-lg font-semibold"
					onClick={() => {
						history.push(`/courses/${courseCode}/resource/create/`)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
					</svg>
					إضافة مصدر
				</button>
			</div>
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				{data?.resources?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<GenericListItem content={edge.node} />
						</div> 

					)
				})}

				{data?.resources?.edges.length! > FIRST && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.resources?.pageInfo.hasNextPage})}
						disabled={!data?.resources?.pageInfo.hasNextPage}
					>
						المزيد
					</button>

				}
			</div>
		</div>
	)
}

export default ResourceList;