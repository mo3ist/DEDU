import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

// import QnAListItem from "./qna-list-item";
// import { GetQnAs } from "./__generated__/GetQnAs";
import { useParams } from "react-router";
import AnswerListItem from "./answer-list-item";
import { GetQuestionAnswers } from "./__generated__/GetQuestionAnswers";

interface Props {
	questionId: string
}

const GET_QUESTION_ANSWERS = gql `
	query GetQuestionAnswers($first: Int, $after: String, $questionId: ID!) {
		answers (first: $first, after: $after, question: $questionId) {
			edges {
				node {
					id
					body
					voteCount
					userVote
					created
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

const AnswerList: React.FC<Props> = ({ questionId }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const course_Code = useParams<{ course: string }>().course
	
	const [getQnAs, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuestionAnswers>(GET_QUESTION_ANSWERS, {
		variables: {
			first: FIRST,
			after: after,
			questionId: questionId
 		}
	});

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div
			className="h-full w-full text-secondary bg-secondary-100"
		>		
			<div
					className="rtl border-b border-primary mb-1"
				>
					<p
						className="text-2xl font-semibold text-primary mb-1"
					>
						الإجابات
					</p>
				</div>
			<div
				className="grid grid-cols-1"
			>
				<div
					className="grid grid-cols-1 gap-4"
				>
					{data?.answers?.edges.map(edge => {
						return (
							edge && <div
								// className=""
							>
								<AnswerListItem answer={edge.node!} />
								<div
									className="w-full flex flex-col items-center"
								>
									<div className="border-b border-secondary-200 w-1/2"></div>
								</div>
							</div> 
						)
					})}
				</div>

				{data?.answers?.pageInfo.hasNextPage ? <button
					className="h-20 w-full bg-primary rounded-sm font-semid text-3xl"
					onClick={() => {
						fetchMore!({
							variables: {
								after: data?.answers?.pageInfo.endCursor
							}
						})
					}}
				>
					المزيد
				</button> : 
				<button
					className="h-20 w-full bg-primary rounded-sm font-semid text-3xl opacity-50 cursor-not-allowed"
				>
					المزيد
				</button>
				}
			</div>
		</div>
	)
}

export default AnswerList;