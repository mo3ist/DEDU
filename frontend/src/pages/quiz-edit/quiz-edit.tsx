import React, { useState } from 'react';
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"


import QuizCreation from '../../common/components/quiz-creation/quiz-creation';
import { currentCourseVar } from '../../common/apollo-client/apollo-client';
import Success from '../../common/components/success/success';
import Loading from '../../common/components/loading/loading';
import { GetEditableQuiz } from './__generated__/GetEditableQuiz';

interface Props {

}

const GET_EDITABLE_QUIZ = gql`
	query GetEditableQuiz($id: ID!){
		quizzes(id: $id) {
			edges {
				node {
					id
					title
					a
					b
					c
					d
					answer
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

const EDIT_QUIZ = gql`
	mutation EditQuiz($modId: ID!, $title: String!, $a: String, $b: String, $c: String, $d: String, $answer: String!, $courseCode: String!, $tags: [String]) {
		createQuiz(input: {
			mod: $modId
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

const QuizEdit: React.FC<Props> = () => {
	
	const currentCourse = useReactiveVar(currentCourseVar)
	
	const [editQuiz, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_QUIZ)
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableQuiz>(GET_EDITABLE_QUIZ, {
		variables: {
			id: currentCourse?.id
		}
	})

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative rounded-lg main-margin">
			{mutationData && <Success />}
			
			{(mutationLoading || queryLoading) && <Loading />}

			<QuizCreation
				content={queryData?.quizzes?.edges[0]?.node}
				onSubmit={({ title, a, b, c, d, answer, tags }) => {
					editQuiz({variables: {
						modId: queryData?.quizzes?.edges[0]?.node?.mod?.id,
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

export default QuizEdit;