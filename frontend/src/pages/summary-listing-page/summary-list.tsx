import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import SummaryListItem from "./summary-list-item";
import { GetSummaries } from "./__generated__/GetSummaries";
import TagSearch from "../../common/components/tag-search/tag-search";

interface Props {

}

const GET_SUMMARY = gql `
	query GetSummaries($first: Int, $after: String, $tag_Title: String) {
		summaries(first: $first, after: $after, tag_Title: $tag_Title) {
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

const SummaryList: React.FC<Props> = () => {

	const FIRST = 1;
	const [ after, setAfter ] = useState<String>(""); 

	const [getSummaries, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetSummaries>(GET_SUMMARY, {
		variables: {
			first: FIRST,
			after: after
		}
	});

	useEffect(() => {
		getSummaries()
	}, [])

	return (
		<div>
			<TagSearch 
				onSearch={(tags) => {
					getSummaries({
						variables: {
							tag_Title: tags,
							after: ""
						}
					})
					setAfter("")
				}
			}/>

			{data?.summaries?.edges.map(edge => {
				return (
					edge && <SummaryListItem summary={edge} />
				)
			})}
			{data?.summaries?.pageInfo?.hasNextPage && <button
				onClick={() => {
					const nextAfter = data?.summaries?.pageInfo?.endCursor!
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

export default SummaryList;