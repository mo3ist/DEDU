import React, { useEffect, useState } from "react"
import { gql, useQuery } from '@apollo/client';

import QnAListItem from "./qna-list-item";
import { GetQnAs } from "./__generated__/GetQnAs";

interface Props {

}

const GET_QNAS = gql `
	query GetQnAs($first: Int, $after: String) {
		questions(first: $first, after: $after) {
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

	const { loading, error, data, fetchMore } = useQuery<GetQnAs>(GET_QNAS, {
		variables: {
			first: FIRST,
			after: after
		}
	});

	useEffect(() => {
		// getQnAs();
	}, []);

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