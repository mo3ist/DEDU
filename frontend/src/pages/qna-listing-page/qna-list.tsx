import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import QnAListItem from "./qna-list-item";
import { GetQnAs } from "./__generated__/GetQnAs";
import TagSearch from "../../common/components/tag-search/tag-search";

interface Props {

}

const GET_QNAS = gql `
	query GetQnAs($first: Int, $after: String, $tag_Title: String) {
		questions(first: $first, after: $after, tag_Title: $tag_Title) {
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

const QnAList: React.FC<Props> = () => {

	const FIRST = 1;
	const [ after, setAfter ] = useState<String>(""); 

	const [getQnAs, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQnAs>(GET_QNAS, {
		variables: {
			first: FIRST,
			after: after
		}
	});

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div>
			<TagSearch 
				onSearch={(tags) => {
					getQnAs({
						variables: {
							tag_Title: tags,
							after: ""
						}
					})
					setAfter("")
				}
			}/>

			{data?.questions?.edges.map(edge => {
				return (
					edge && <QnAListItem question={edge} />
				)
			})}
			{data?.questions?.pageInfo?.hasNextPage && <button
				onClick={() => {
					const nextAfter = data?.questions?.pageInfo?.endCursor!
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

export default QnAList;