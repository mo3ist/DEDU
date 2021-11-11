import React from "react"
import { Link, useLocation } from "react-router-dom"
import TextEditor from "../../common/components/text-editor/text-editor"
import Vote from "../../common/components/vote/vote"

import { GetQuestionAnswers_answers_edges_node } from "./__generated__/GetQuestionAnswers"

const arTimeAgo = require('artimeago')

interface Props {
	answer: GetQuestionAnswers_answers_edges_node 
}

const AnswerListItem: React.FC<Props> = ({ answer }) => {

	const location = useLocation()

	return (
		<div
			className="h-54 bg-secondary-100 flex flex-col gap-1 p-1 rtl rounded-sm text-secondary"
		>
			{/* upper part */}
			<div
				className="flex-grow flex flex-row gap-1 p-1 items-start"
			>
				
				{/* title + user data */}
				<div
					className="flex flex-col items-start justify-center gap-1"
				>
					<Vote
						contentId={answer?.id}
						voteCount={answer?.voteCount!}	
					/>
					<div
						className="flex flex-col items-start justify-center gap-1"
					>
						<p
							className="font-semibold"
						>
							hehe
						</p>

						<p
							className="flex items-center gap-2"
						>
							منذ <span className="text-primary font-bold">{arTimeAgo({date: new Date(answer?.created).getTime()}).split('منذ')[1]}</span>
						</p>
					</div>
				</div>
				{/* no. answers + date */}
				<div
					className="flex-grow pr-4"
				>
					<TextEditor 
						readonly={true}
						value={answer?.body}
					/>
				</div>
			</div>
		</div>
	)
}

export default AnswerListItem;