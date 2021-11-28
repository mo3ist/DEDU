import classNames from "classnames"
import { gql } from "@apollo/client"
import React, { useEffect, useState } from "react"
import TextEditor from "../../common/components/text-editor/text-editor"
import Vote from "../../common/components/vote/vote"
import { GetQuizzes_quizzes_edges_node } from "./__generated__/GetQuizzes"

import apolloClient from "../../common/apollo-client/apollo-client" 

const arTimeAgo = require('artimeago')

interface Props {
	quiz: GetQuizzes_quizzes_edges_node | null
}

const QuizItem: React.FC<Props> = ({ quiz }) => {

	// Populate with userAnswer if exists
	const [value, setValue] = useState(quiz?.userAnswer || "")
	const [reveal, setReveal] = useState(quiz?.userAnswer !== "")

	return (
		<div
			className="h-96 bg-secondary-100 rounded-lg flex flex-row items-start justify-center rtl p-2 md:p-4 gap-4"
		>
			{/* votes and user data */}
			<div
				className="flex flex-col items-start justify-center gap-1 w-14 md:w-36"
			>
				<Vote
					contentId={quiz?.id!}
					voteCount={quiz?.voteCount!}	
					userVote={quiz?.userVote!}
				/>
				<div
					className="w-full flex flex-col items-start justify-center gap-1"
				>
					<div
						className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full overflow-hidden"
					>
						<img src={quiz?.user.profilePicture!} alt="" />
					</div>
					<p
						className="font-semibold text-sm md:text-base w-full whitespace-pre-wrap truncate" 
					>
						{quiz?.user?.name}
					</p>

					<p
						className="flex items-center gap-1 md:gap-2 flex-wrap"
					>
						منذ <span className="text-primary text-sm md:text-base font-bold">{arTimeAgo({date: new Date(quiz?.created).getTime()}).split('منذ')[1]}</span>
					</p>
				</div>
			</div>

			{/* quiz data */}
			<div
				className="flex-grow flex flex-col items-start justify-cente h-full gap-2"
			>
				<div
					className="md:text-xl font-semibold h-2/6"
				>
					<TextEditor 
						value={quiz?.title!}
						readonly={true}
					/>
				</div>
				<div
					className="relative flex-grow w-full"
				>
					<div
						className="grid grid-cols-2 gap-1 md:gap-4 p-1 h-full"
					>
						{[quiz?.a, quiz?.b, quiz?.c, quiz?.d].map(option => {
							return (
								<label className={classNames("text-sm md:text-lg", {"text-green-800": reveal && option === quiz?.answer, "text-red-800": reveal && option === value})}>
									<input 
										type="radio" 
										name="option" 
										className="ml-1 md:ml-2 w-5 h-5 inline"
										disabled={reveal}
										onClick={() => setValue(option!)}
									/>
									{option}
								</label>
							)
						})}
					</div>
					{reveal && <div
						className={classNames("absolute inset-0 z-10 opacity-30 rounded-lg flex items-center justify-center", {"bg-green-50": value === quiz?.answer, "bg-red-50": value !== quiz?.answer})}
					>
						<p
							className="text-secondary text-xl md:text-3xl font-bold"
						>
							{value === quiz?.answer && "إجابة صحيحة"}
							{value !== quiz?.answer && "إجابة خاطئة"}
						</p>
					</div>}
				</div>
				<button
					className={classNames("h-16 w-full bg-primary text-xl font-semibold rounded-lg", {"opacity-50 cursor-not-allowed": reveal})}
					disabled={reveal}
					onClick={() => {
						if (!reveal) {
							if (value !== "") {
								setReveal(true)

								// Writing to the local field
								apolloClient.writeQuery({
									query: gql`
										query SendUserAnswer($id: ID!){
											quizzes(id: $id) {
												edges {
													node {
														id
														userAnswer
													}
												}
											}
										}
									`,
									data: {
										quizzes: {
											edges: [
												{ 
													node: {
														__typename: "QuizType",
														id: quiz?.id,
														userAnswer: value
													}
												}
											]
										}
										
									},
									variables: {
										id: quiz?.id
									}
								})
							}
						}
					}}
				>
					{/* {!reveal && "تحقق"}
					{reveal && value === quiz?.answer && "إجابة صحيحة"}
					{reveal && value !== quiz?.answer && "إجابة خاطئة"} */}
					تحقق
				</button>
			</div>
		</div>
	)
}

export default QuizItem