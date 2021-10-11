import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import QnAListItem from "./qna-list-item";
import { GetQnAs } from "./__generated__/GetQnAs";

interface Props {
	tags: Array<String> | null
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

const QnAList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const [getQnAs, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQnAs>(GET_QNAS, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(",")
		}
	});

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div>
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