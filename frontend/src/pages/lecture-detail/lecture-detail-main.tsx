import React from "react"
import QuestionList from "../question-listing-page/question-list"
import { GetDetailedLecture_lectures_edges_node } from "./__generated__/GetDetailedLecture"

interface Props {
	lecture: GetDetailedLecture_lectures_edges_node | null
}

const LectureDetailMain: React.FC<Props> = ({ lecture }) => {
	const videoAttachment = lecture?.attachmentSet?.edges.filter(edge => edge?.node?.attmType === "VIDEO")[0]?.node
	return (
		<div
			className="bg-secondary-100 rounded-lg px-4 py-2 flex flex-col gap-4 h-full w-full rtl"
		>
			{/* meta */}
			<div
				className="w-full flex flex-col items-center justify-center"
			>
				<p className="text-2xl border-b border-secondary-200 pb-1">{lecture?.title}</p>
				{lecture?.teachers?.edges?.map(edge => {
					return <p>
						{edge?.node?.title}
					</p>
				})}
			</div>
			{/* media */}
			<div
				className="h-96 bg-secondary-200 rounded-lg overflow-hidden flex items-center justify-center"
			>
				{videoAttachment ? <iframe
					className="h-full w-full"
					src={videoAttachment?.url!}
				>
				</iframe> :
				<p
					className="text-secondary md:text-lg font-semibold"
				>
					لا يتوفر فيديو لهذه المحاضرة.
				</p>
				}
			</div>
			
			
			{/* Other attachments */}
			<div
				className="bg-secondary-200 rounded-lg flex flex-col gap-2 p-2"
			>
				<p
					className="text-xl md:text-2xl"
				>
					المرفقات
				</p>
				{lecture?.attachmentSet?.edges.map(edge => {
					return (
						<div
							className="flex flex-col items-start justify-center gap-2"
						>
							{edge?.node?.attmType === "DOCUMENT" && 
								<a
									className="h-20 w-20 md:w-28 md:h-28 flex flex-col items-center justify-center bg-secondary-100 p-1 rounded-lg"
									href={edge.node.url!}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
									</svg>
									<p className="w-full truncate">{edge.node?.title}</p>
								</a>
							}
						</div>
					)
				})}
				{lecture?.attachmentSet?.edges.length === 0 && 
				<p 
					className="w-full h-full flex text-center items-center justify-center text-secondary md:text-lg font-semibold 	p-5"
				>
					لا يتوفر مرفقات لهذه المحاضرة.
				</p>}

			</div>

			{/* line */}
			{/* <div
				className="flex justify-center"
			>
				<div className="border-b border-secondary w-5/6"></div>
			</div> */}

			{/* body */}
			<div>
				{lecture?.body}
			</div>
		</div>
	)
}

export default LectureDetailMain