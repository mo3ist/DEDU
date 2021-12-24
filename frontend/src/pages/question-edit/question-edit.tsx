import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';
import { GetEditableQuestion, GetEditableQuestion_questions_edges_node } from './__generated__/GetEditableQuestion';

interface Props {

}

const EDIT_QUESTION = gql`
	mutation EditQuestion($modId: ID!, $title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createQuestion(input: {
			mod: $modId
			title: $title,
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			question {
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

const GET_EDITABLE_QUESTION = gql`
	query GetEditableQuestion($id: ID!) {
		questions(id: $id) {
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

const QuestionEdit: React.FC<Props> = () => {
	
	const [question, setQuestion] = useState<GetEditableQuestion_questions_edges_node | null>(null)
	const [editQuestion, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_QUESTION)
	
	const { course: courseCode, id } = useParams<{ course: string, id: string }>()
	
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableQuestion>(GET_EDITABLE_QUESTION, {
		onCompleted: (data) => {
			setQuestion(data.questions?.edges[0]?.node!)
		},
		variables: {
			id: id
		}
	})
	
	const checkNewTags = (tags: string[]): boolean => {
		return tags.filter(is_new => !question?.tagSet?.edges.map(tag => tag?.node?.title).includes(is_new)).length > 0
	}

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative h-full rounded-lg main-margin">
			{mutationData && <Success redirectUrl={`/courses/${courseCode}/question/`} />}
			
			{(queryLoading || mutationLoading) && <Loading />}

			<GenericCreation 
				content={question}
				courseCode={courseCode}
				onSubmit={({ title, body, tags }) => {
					// TODO: Tag inequality
					if (title !== question?.title || body !== question?.body || checkNewTags(tags!)) {
						editQuestion({
							variables: {
								modId: question?.mod?.id,
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

export default QuestionEdit;