import React from "react"
import QnAList from "../qna-listing-page/qna-list"
import { GetDetailedLecture_lectures_edges_node } from "./__generated__/GetDetailedLecture"

interface Props {
	lecture: GetDetailedLecture_lectures_edges_node | null
}

const LectureDetailMain: React.FC<Props> = ({ lecture }) => {
	console.log(lecture)
	return (
		<div
			className="bg-secondary-100 rounded-lg px-4 py-2 flex flex-col gap-1 h-full w-full"
		>
			{/* meta */}
			<div
				className="w-full flex flex-col items-center justify-center"
			>
				<p className="text-2xl">{lecture?.title}</p>
				{lecture?.teachers?.edges?.map(edge => {
					return <p>
						{edge?.node?.title}
					</p>
				})}
			</div>
			{/* line */}
			<div
				className="flex justify-center"
			>
				<div className="border-b border-secondary w-5/6"></div>
			</div>
			{/* media */}
			<div
				className="h-96 bg-secondary-200 rounded-lg"
			>

			</div>
			{/* line */}
			<div
				className="flex justify-center"
			>
				<div className="border-b border-secondary w-5/6"></div>
			</div>


			{/* body */}
			<div>
				{lecture?.body}
			</div>
		</div>
	)
}

export default LectureDetailMain