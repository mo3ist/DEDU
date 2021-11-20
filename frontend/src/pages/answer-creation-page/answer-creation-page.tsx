import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import AnswerCreation from '../../common/components/answer-creation/answer-creation';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';

interface Props {
	questionId: string;
}

const CREATE_ANSWER = gql`
	mutation CreateAnswer($questionId: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createAnswer(input: {
			question: $questionId,
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			answer {
				id
				body
				question {
					id
				}
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

const AnswerCreationPage: React.FC<Props> = ({ questionId }) => {
	
	const [createAnswer, { loading, error, data }] = useMutation(CREATE_ANSWER)
	const courseCode = useParams<{ course: string }>().course

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative">
			{data && <Success />}
			
			{loading && <Loading />}

			<AnswerCreation
				courseCode={courseCode}
				onSubmit={({ body }) => {
					createAnswer({
						variables: {
							body: body,
							courseCode: courseCode,
							tags: [],
							questionId: questionId
						}
					})
				}}
			/> 
		</div>
	)
}

export default AnswerCreationPage;