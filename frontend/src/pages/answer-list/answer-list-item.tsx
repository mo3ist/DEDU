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
					className="flex flex-col items-start justify-center gap-1 w-14 md:w-36"
				>
					<Vote
						contentId={answer?.id}
						voteCount={answer?.voteCount!}	
						userVote={answer?.userVote!}
					/>
					<div
						className="w-full flex flex-col items-start justify-center gap-1"
					>
						<div
							className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full overflow-hidden"
						>
							<img src={answer?.user.profilePicture!} alt="" />
						</div>
						<p
							className="font-semibold text-sm md:text-base w-full whitespace-pre-wrap truncate" 
						>
							{answer?.user?.name}
						</p>

						<p
							className="flex items-center gap-1 md:gap-2 flex-wrap"
						>
							منذ <span className="text-primary text-sm md:text-base font-bold">{arTimeAgo({date: new Date(answer?.created).getTime()}).split('منذ')[1]}</span>
						</p>
					</div>
				</div>
				<div
					className="w-5/6 pr-4"
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