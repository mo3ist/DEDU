import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import ResourceListItem from "./resource-list-item";
import { GetResources } from "./__generated__/GetResources";
import TagSearch from "../../common/components/tag-search/tag-search";

interface Props {

}

const GET_RESOURCES = gql `
	query GetResources($first: Int, $after: String, $tag_Title: String) {
		resources(first: $first, after: $after, tag_Title: $tag_Title) {
			edges {
				node {
					title 
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

const ResourceList: React.FC<Props> = () => {

	const FIRST = 1;
	const [ after, setAfter ] = useState<String>(""); 

	const [getResources, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetResources>(GET_RESOURCES, {
		variables: {
			first: FIRST,
			after: after
		}
	});

	useEffect(() => {
		getResources()
	}, [])

	return (
		<div>
			<TagSearch 
				onSearch={(tags) => {
					getResources({
						variables: {
							tag_Title: tags,
							after: ""
						}
					})
					setAfter("")
				}
			}/>

			{data?.resources?.edges.map(edge => {
				return (
					edge && <ResourceListItem resource={edge} />
				)
			})}
			{data?.resources?.pageInfo?.hasNextPage && <button
				onClick={() => {
					const nextAfter = data?.resources?.pageInfo?.endCursor!
					fetchMore!({
						variables: {
							after: nextAfter
						}
					});
					setAfter(nextAfter);
				}}
			>
				Next
			</button>}
			
		</div>
	)
}

export default ResourceList;