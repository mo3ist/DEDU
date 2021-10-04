import React, { useState } from "react"
import { GetLectures_lectures_edges } from "./__generated__/GetLectures";

interface Props {
	lecture: GetLectures_lectures_edges | null
}

const LectureListItem: React.FC<Props> = ({ lecture }) => {

	return (
		<div
			className="grid grid-col-1 gap-1 bg-red-100"
		>
			<div
				className="grid grid-rows-1 grid-flow-col"
			>
				{lecture?.node?.attachmentSet?.edges.map(edge => {
					return (
						<div>
							{edge?.node?.attmType}
						</div>
					)
				})}
			</div>
			<div
				className="grid grid-rows-1 grid-flow-col"
			>
				{lecture?.node?.tagSet?.edges.map(edge => {
					return (
						<div>
							Tags: {edge?.node?.title} {edge?.node?.tagType}
						</div>
					)
				})}
			</div>
			<div
				className="grid grid-rows-1 grid-flow-col"
			>
				<div>
					Title: {lecture?.node?.title}
				</div>
				<div>
					Body: {lecture?.node?.body}
				</div>
			</div>
		</div>
	)
}

export default LectureListItem;