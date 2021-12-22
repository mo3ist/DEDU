import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';

interface Props {

}

const CREATE_QUESTION = gql`
	mutation CreateQuestion($title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createQuestion(input: {
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

const QuestionCreationPage: React.FC<Props> = () => {
	
	const [createQuestion, { loading, error, data }] = useMutation(CREATE_QUESTION)
	const courseCode = useParams<{ course: string }>().course

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative main-margin rounded-lg">
			{data && <Success redirectUrl={`/courses/${courseCode}/question/`}/>}
			
			{loading && <Loading />}

			<GenericCreation 
				courseCode={courseCode}
				onSubmit={({ title, body, tags }) => {
					createQuestion({
						variables: {
							title: title,
							body: body,
							courseCode: courseCode,
							tags: tags
						}
					})
				}}
			/> 
		</div>
	)
}

export default QuestionCreationPage;