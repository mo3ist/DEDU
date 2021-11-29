import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';
import { GetEditableSummary, GetEditableSummary_summaries_edges_node } from './__generated__/GetEditableSummary';

interface Props {

}

const EDIT_SUMMARY = gql`
	mutation EditSummary($modId: ID!, $title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createSummary(input: {
			mod: $modId
			title: $title,
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			summary {
				title
				body
				course {
					code
				}
				tagSet {
					edges {
						node {
							title
						}
					}
				}
			}
		}
	}
`

const GET_EDITABLE_SUMMARY = gql`
	query GetEditableSummary($id: ID!) {
		summaries(id: $id) {
			edges {
				node {
					id
					title
					body
					tagSet {
						edges {
							node {
								title
								tagType
							}
						}
					}
					mod {
						id
					}
				}
			}
		}
	}
`

const SummaryEdit: React.FC<Props> = () => {
	
	const [summary, setSummary] = useState<GetEditableSummary_summaries_edges_node | null>(null)
	const [editSummary, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_SUMMARY)
	
	const { course: courseCode, id } = useParams<{ course: string, id: string }>()
	
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableSummary>(GET_EDITABLE_SUMMARY, {
		onCompleted: (data) => {
			setSummary(data.summaries?.edges[0]?.node!)
		},
		variables: {
			id: id
		}
	})
	
	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative h-full rounded-lg main-margin">
			{mutationData && <Success />}
			
			{(queryLoading || mutationLoading) && <Loading />}

			<GenericCreation 
				content={summary}
				courseCode={courseCode}
				onSubmit={({ title, body, tags }) => {
					// TODO: Tag inequality
					if (title !== summary?.title || body !== summary?.body) {
						editSummary({
							variables: {
								modId: summary?.mod?.id,
								title: title,
								body: body,
								courseCode: courseCode,
								tags: tags
							}
						})
					}
				}}
			/>
		</div>
	)
}

export default SummaryEdit;