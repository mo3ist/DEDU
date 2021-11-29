import React from 'react';
import { gql, useMutation, useReactiveVar } from "@apollo/client"


import QuizCreation from '../../common/components/quiz-creation/quiz-creation';
import { currentCourseVar } from '../../common/apollo-client/apollo-client';
import Success from '../../common/components/success/success';
import Loading from '../../common/components/loading/loading';

interface Props {

}

const CREATE_QUIZ = gql`
	mutation CreateQuiz($title: String!, $a: String, $b: String, $c: String, $d: String, $answer: String!, $courseCode: String!, $tags: [String]) {
		createQuiz(input: {
			title: $title,
			a: $a,
			b: $b,
			c: $c,
			d: $d,
			answer: $answer,
			course: $courseCode,
			tagSet: $tags,
		}) {
			quiz {
				id
				title
				a
				b
				c
				d
				answer
			}
		}
	}
`

const QuizCreationPage: React.FC<Props> = () => {
	
	const [createQuiz, { loading, error, data }] = useMutation(CREATE_QUIZ)
	const currentCourse = useReactiveVar(currentCourseVar)

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative main-margin rounded-lg">
			{data && <Success />}
			
			{loading && <Loading />}

			<QuizCreation onSubmit={({ title, a, b, c, d, answer, tags }) => {
				createQuiz({variables: {
					title: title,
					a: a,
					b: b,
					c: c,
					d: d,
					answer: answer,
					tags: tags,
					courseCode: currentCourse?.code
				}})
			}}/>
		</div>
	)
}

export default QuizCreationPage;