import React from "react"

import { GetQnAs_questions_edges } from './__generated__/GetQnAs'

interface Props {
	question: GetQnAs_questions_edges 
}

const QnAListItem: React.FC<Props> = ({ question }) => {

	return (
		<div>
			<h1>{question.node?.title}</h1>
		</div>
	)
}

export default QnAListItem;