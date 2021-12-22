import React from "react"

import QuizListItem from "./quiz-list-item";

interface Props {
	tags: string[] | null
}

const QuizList: React.FC<Props> = ({ tags }) => {
	return (
		<div
			className="h-full w-full rtl"
		>	
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				<QuizListItem />
			</div>
		</div>
	)
}

export default QuizList;