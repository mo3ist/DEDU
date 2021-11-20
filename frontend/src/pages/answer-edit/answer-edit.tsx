import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnswerCreation from '../../common/components/answer-creation/answer-creation';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';
import { GetEditableAnswer, GetEditableAnswer_answers_edges_node } from './__generated__/GetEditableAnswer';
// import { GetEditableAnswer, GetEditableAnswer_answers_edges_node } from './__generated__/GetEditableAnswer';

interface Props {
	answerId: string
}

const EDIT_ANSWER = gql`
	mutation EditAnswer($modId: ID!, $questionId: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createAnswer(input: {
			mod: $modId,
			question: $questionId
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			answer {
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

const GET_EDITABLE_ANSWER = gql`
	query GetEditableAnswer($id: ID!) {
		answers(id: $id) {
			edges {
				node {
					id
					body
					mod {
						id
					}
					question {
						id
					}
				}
			}
		}
	}
`

const AnswerEdit: React.FC<Props> = ({ answerId }) => {
	
	const [answer, setAnswer] = useState<GetEditableAnswer_answers_edges_node | null>(null)
	const [editAnswer, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_ANSWER)
	
	const { course: courseCode } = useParams<{ course: string, id: string }>()
	
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableAnswer>(GET_EDITABLE_ANSWER, {
		onCompleted: (data) => {
			setAnswer(data.answers?.edges[0]?.node!)
		},
		variables: {
			id: answerId
		}
	})
	
	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative h-full">
			{mutationData && <Success />}
			
			{(queryLoading || mutationLoading) && <Loading />}

			<AnswerCreation 
				content={answer}
				key={answer?.id}
				courseCode={courseCode}
				onSubmit={({ body }) => {
					// TODO: Tag inequality
					if (body !== answer?.body) {
						editAnswer({
							variables: {
								modId: answer?.mod?.id,
								questionId: answer?.question?.id,
								body: body,
								courseCode: courseCode,
								tags: []
							}
						})
					}
				}}
			/>
		</div>
	)
}

export default AnswerEdit;