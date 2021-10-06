import React from "react"

import { GetSummaries_summaries_edges } from './__generated__/GetSummaries'

interface Props {
	summary: GetSummaries_summaries_edges 
}

const SummaryListItem: React.FC<Props> = ({ summary }) => {

	return (
		<div>
			<h1>{summary.node?.title}</h1>
		</div>
	)
}

export default SummaryListItem;