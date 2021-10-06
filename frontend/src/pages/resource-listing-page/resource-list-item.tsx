import React from "react"

import { GetResources_resources_edges } from './__generated__/GetResources'

interface Props {
	resource: GetResources_resources_edges 
}

const QnAListItem: React.FC<Props> = ({ resource }) => {

	return (
		<div>
			<h1>{resource.node?.title}</h1>
		</div>
	)
}

export default QnAListItem;