import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import ResourceListingItem from "./resource-list-item";
import { GetResources as GetResources } from "./__generated__/GetResources";
import { useHistory, useParams } from "react-router";
import GenericListItem from "../../common/components/generic-list/generic-list-item";
import classNames from "classnames";
import Loading from "../../common/components/loading/loading";

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
					mod {
						state
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
			className="relative h-full w-full text-secondary rtl"
		>	
			{loading && <Loading />}
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				{data?.resources?.edges.map(edge => {
					return (
						edge && <div
							className="rounded-lg overflow-hidden"
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
			{!data && <p
				className="h-96 flex items-center justify-center font-semibold text-primary text-xl md:text-3xl"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
				</svg>
				لاتتوفر نتائج
			</p>}
		</div>
	)
}

export default ResourceList;