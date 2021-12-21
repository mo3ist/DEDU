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
			className="h-full w-full text-secondary rtl"
		>	
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