import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery, useReactiveVar } from '@apollo/client';

// import QnAListItem from "./qna-list-item";
// import { GetQnAs } from "./__generated__/GetQnAs";
import { useHistory, useParams } from "react-router";
import AnswerListItem from "./answer-list-item";
import { GetQuestionAnswers } from "./__generated__/GetQuestionAnswers";
import classNames from "classnames";
import AnswerCreationPage from "../answer-creation-page/answer-creation-page";
import AnswerEdit from "../answer-edit/answer-edit";
import { currentCourseVar, currentUserVar } from "../../common/apollo-client/apollo-client";
import Loading from "../../common/components/loading/loading";
import ProtectedButton from "../../common/components/protected-button/protected-button";

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
					mod {
						id 
						state
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
	
	const courseCode = useParams<{ course: string }>().course
	
	const [getQnAs, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuestionAnswers>(GET_QUESTION_ANSWERS, {
		variables: {
			first: FIRST,
			after: after,
			questionId: questionId
		}
	});

	const [ creation, setCreation ] = useState<boolean>(false); 
	const [editableAnswerId, setEditableAnswerId] = useState("")

	const history = useHistory()
	const currentUser = useReactiveVar(currentUserVar)

	useEffect(() => {
		getQnAs()
	}, [])

	return (
		<div
			className="h-full w-full text-secondary flex flex-col items-start justify-center rtl"
		>		
			{/* <div
				className="rtl border-b border-primary mb-1"
			>
				<p
					className="text-2xl font-semibold text-primary mb-1"
				>
					الإجابات
				</p>
			</div> */}
			<div
				className="mb-4 md:mb-8 rounded-b-lg flex flex-row items-center justify-start"
			>
				<div
					className="flex-grow flex items-center justify-start"
				>
					<ProtectedButton
						className="rounded-lg bg-primary p-2 flex flex-row items-center justify-center gap-1 md:text-lg"
						onClick={() => {
							setCreation(!creation)
						}}
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
						</svg>
						إضافة إجابة
					</ProtectedButton>
				</div>
				{/* <ProtectedButton
					className="bg-secondary-100 p-2 md:p-4 rounded-lg md:text-lg font-semibold"
					onClick={() => {
						setCreation(!creation)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
					</svg>
					إضافة إجابة
				</ProtectedButton> */}
			</div>
			<div
				className="flex-grow w-full relative grid grid-cols-1 gap-4 md:gap-8"
			>
				{loading &&
				<div
					className="h-96"
				>
					<Loading />
				</div>}

				<div
					className="grid grid-cols-1 gap-4 md:gap-8"
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
								className="grid grid-cols-1"
							>
								{/* {currentUser?.name === edge.node?.user.name && 
								<div
									className="w-full"
								>
									<button
										className="bg-primary-100 py-1 px-2 rounded-t-lg text-sm md:text-base"
										onClick={() => {
											setEditableAnswerId(editableAnswerId === edge.node?.id! ? "" : edge.node?.id!)
										}}
									>
										تعديل
									</button>
								</div>} */}
								{editableAnswerId !== edge.node?.id ? 
									<AnswerListItem
										answer={edge.node!} 
										editableAnswerId={editableAnswerId}
										setEditableAnswerId={setEditableAnswerId}
									/> :
									<AnswerEdit answerId={edge.node.id}/>
								} 
							</div> 
						)
					})}
				</div>
				{data?.answers?.edges.length! > FIRST && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.answers?.pageInfo.hasNextPage})}
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