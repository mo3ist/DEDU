import React from "react"
import { gql, useMutation } from "@apollo/client"
import classname from "classnames"

import ProtectedButton from "../protected-button/protected-button";

interface Props {
	contentId: string;
	voteCount: number;
	userVote: string | null;
}

const VOTE = gql`
	mutation Vote($contentId: ID!, $value: String!) {
		createVote(input: {
			value: $value,
			contentId: $contentId
		}) { 
			vote {
				id
				value
				contentObject {
					... on SummaryType {
						id
						voteCount
						userVote
					}
					... on ResourceType {
						id
						voteCount
						userVote
					}
					... on QuestionType {
						id
						voteCount
						userVote
					}
					... on AnswerType {
						id
						voteCount
						userVote
					}
					... on QuizType {
						id
						voteCount
						userVote
					}
				}
			}
		}
	}
`

const Vote: React.FC<Props> = ({ contentId, voteCount, userVote }) => {

	const [vote, {loading, error, data}] = useMutation(VOTE);

	return (
		<div
			className="flex flex-col w-8 md:w-10 items-center justfiy-center text-primary-100"
		>
			{/* upvote */}
			<ProtectedButton
				onClick={() => {
					vote({
						variables: {
							contentId: contentId,
							value: "UPVOTE"
						}
					})
				}}
				className={classname("text-primary border border-primary rounded-lg md:w-10", {"rounded-lg bg-primary text-secondary-100": userVote === "UPVOTE"})}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:h-9 md:w-9" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
				</svg>
			</ProtectedButton>
			<p
				className={classname("align-middle text-md md:text-2xl font-bold", {"text-primary": userVote})}
			>
				{voteCount}
			</p>
			{/* downvote */}
			<ProtectedButton
				onClick={() => {
					vote({
						variables: {
							contentId: contentId,
							value: "DOWNVOTE"
						}
					})
				}}
				className={classname("text-primary border border-primary rounded-lg", {"rounded-lg bg-primary text-secondary-100": userVote === "DOWNVOTE"})}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:h-9 md:w-9" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</ProtectedButton>
		</div>
	)
} 

export default Vote; 