import React, { useState } from 'react';
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client"


import QuizCreation from '../../common/components/quiz-creation/quiz-creation';
import { currentCourseVar } from '../../common/apollo-client/apollo-client';
import Success from '../../common/components/success/success';
import Loading from '../../common/components/loading/loading';
import { GetEditableQuiz, GetEditableQuiz_quizzes_edges_node } from './__generated__/GetEditableQuiz';
import { GetQuiz_quizzes_edges_node } from '../quiz-detail/__generated__/GetQuiz';
import { GetEditableQuestion_questions_edges_node } from '../question-edit/__generated__/GetEditableQuestion';
import { useParams } from 'react-router';

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
	const quizId = useParams<{id: string}>().id

	const [editQuiz, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_QUIZ)
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableQuiz>(GET_EDITABLE_QUIZ, {
		variables: {
			id: quizId
		}
	})

	const checkNewTags = (tags: string[], quiz: GetEditableQuiz_quizzes_edges_node): boolean => {
		return tags.filter(is_new => !quiz?.tagSet?.edges.map(tag => tag?.node?.title).includes(is_new)).length > 0
	}

	const checkNewQuiz = (title: string, a: string | null, b:string | null, c:string | null, d:string | null, answer:string, quiz:GetEditableQuiz_quizzes_edges_node, tags: string[]): boolean => {
		return ( 
			checkNewTags(tags, quiz) ||  
			title !== quiz?.title ||
			a !== quiz?.a || 
			b !== quiz?.b || 
			c !== quiz?.c ||
			d !== quiz?.d ||
			answer !== quiz?.answer
		)
	}

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative rounded-lg main-margin">
			{mutationData && <Success redirectUrl={`/courses/${currentCourse?.code}/quiz/`} />}
			
			{(mutationLoading || queryLoading) && <Loading />}

			<QuizCreation
				key={queryData?.quizzes?.edges[0]?.node?.id}
				content={queryData?.quizzes?.edges[0]?.node}
				onSubmit={({ title, a, b, c, d, answer, tags }) => {
					if (checkNewQuiz(
						title!,
						a,
						b,
						c,
						d,
						answer!,
						queryData?.quizzes?.edges[0]?.node!,
						tags!,
					)) {
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
					}
			}}/>
		</div>
	)
}

export default QuizEdit;