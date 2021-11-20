import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

// import QnAListItem from "./qna-list-item";
// import { GetQnAs } from "./__generated__/GetQnAs";
import { useParams } from "react-router";
import AnswerListItem from "./answer-list-item";
import { GetQuestionAnswers } from "./__generated__/GetQuestionAnswers";
import classNames from "classnames";
import AnswerCreationPage from "../answer-creation-page/answer-creation-page";
import AnswerEdit from "../answer-edit/answer-edit";

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
					user {
						name
						profilePicture
					}
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

	const [ creation, setCreation ] = useState<boolean>(false); 
	const [editableAnswerId, setEditableAnswerId] = useState("")

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div
			className="h-full w-full text-secondary rtl"
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
				className="h-20 bg-secondary-200 mb-8 rounded-b-lg flex flex-row items-center justify-start pr-4"
			>
				<button
					className="bg-secondary-100 p-4 rounded-lg text-lg font-semibold"
					onClick={() => {
						setCreation(true)
					}}
				>
					إضافة إجابة
				</button>
			</div>
			<div
				className="grid grid-cols-1 gap-8"
			>
				<div
					className="grid grid-cols-1 gap-8"
				>
					{creation && 
						<div

						>
							<AnswerCreationPage questionId={questionId}/>
						</div>
					}
					{data?.answers?.edges.map(edge => {
						return (
							edge && <div
								className="rounded-lg overflow-hidden grid grid-cols-1"
							>
								<div
									className="w-full"
								>
									<button
										className="bg-primary-100 py-1 px-2 rounded-t-lg"
										onClick={() => {
											setEditableAnswerId(edge.node?.id!)	
										}}
									>
										تعديل
									</button>
								</div>
								{editableAnswerId !== edge.node?.id ? 
									<AnswerListItem answer={edge.node!} /> :
									<AnswerEdit answerId={edge.node.id}/>
								} 
							</div> 
						)
					})}
				</div>
				{data?.answers?.edges.length! > 0 && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary rounded-sm font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.answers?.pageInfo.hasNextPage})}
						disabled={!data?.answers?.pageInfo.hasNextPage}
					>
						المزيد
					</button>

				}
			</div>
		</div>
	)
}

export default AnswerList;