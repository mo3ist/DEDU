import { gql, useReactiveVar } from "@apollo/client";
import React from "react"

import Vote from "../vote/vote"
import TextEditor from "../text-editor/text-editor";
import { GetDetailedSummary_summaries_edges_node } from "../../../pages/summary-detail/__generated__/GetDetailedSummary";
import { GetDetailedResource_resources_edges_node } from "../../../pages/resource-detail/__generated__/GetDetailedResource";
import { GetDetailedQuestion_questions_edges_node } from "../../../pages/question-detail/__generated__/GetDetailedQuestion";
import Loading from "../loading/loading";
import { currentCourseVar, currentUserVar } from "../../apollo-client/apollo-client";
import { useHistory } from "react-router";
import classNames from "classnames";

const arTimeAgo = require('artimeago')

interface Props {
	content: GetDetailedSummary_summaries_edges_node | GetDetailedResource_resources_edges_node | GetDetailedQuestion_questions_edges_node | null
}

const GenericDetail: React.FC<Props> = ({ content }) => {

	const currentUser = useReactiveVar(currentUserVar)
	const currentCourse = useReactiveVar(currentCourseVar)
	const history = useHistory()

	const buildPath = (id: string, page: string): string => {
		const courseCode = currentCourse?.code
		var contentType = ""
		switch (content?.__typename) {
			case "QuestionType":
				contentType = "question"
				break
			case "SummaryType":
				contentType = "summary"
				break
			case "ResourceType":
				contentType = "resource"
				break
		}
		return `/courses/${courseCode}/${contentType}/${page}/${id}`
	}

	return (
		<div
			className={classNames("grid grid-cols-1 rtl", {
				"border-r border-primary pr-1": currentUser?.name === content?.user.name 
			})}
		>
			{currentUser?.name === content?.user.name && 
			<div
				className="w-full flex flex-row items-center justify-start gap-1" 
			>
				{content?.mod?.state != "REJECTED" && <button
					className="bg-primary-100 py-1 px-2 rounded-t-lg text-sm md:text-base flex items-center justify-center rtl"
					onClick={() => {
						history.push(buildPath(content?.id!, "edit"))
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
					تعديل
				</button>}
				
				<p
					className={classNames("py-1 px-2 rounded-t-lg text-sm md:text-base", {
						"bg-yellow-300 text-secondary": content?.mod?.state === "PENDING",
						//"bg-green-600": content?.mod?.state === "APPROVED",
						"bg-red-800 text-secondary-100": content?.mod?.state === "REJECTED",
						
					})}
				>
					{content?.mod?.state === "PENDING" && "قيد المراجعة"}
					{content?.mod?.state === "REJECTED" && "مرفوض"}
				</p>
			</div>}

			<div
				className={classNames("h-full w-full flex flex-row items-start bg-secondary-100 gap-2 p-2 rtl text-secondary", 
				{
					"rounded-tl-lg rounded-b-lg": currentUser?.name === content?.user.name,
					"rounded-lg": currentUser?.name !== content?.user.name,
				})}
			>
				
				{/* Votes & user */}
				<div
					className="flex-initial flex flex-col items-start justify-center gap-1 md:gap-2 w-14 md:w-36"
				>
					<div>
						<Vote 
							contentId={content?.id!}
							voteCount={content?.voteCount!}
							userVote={content?.userVote!}
						/>
					</div>
					<div
						className="w-full flex flex-col items-start justify-start gap-1"
					>
						<div
							className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full overflow-hidden"
						>
							<img src={content?.user.profilePicture!} alt="" />
						</div>
						<p
							className="font-semibold text-sm md:text-base w-full whitespace-pre-wrap truncate"
						>
							{content?.user.name}
						</p>
					</div>
					<p
						className="flex items-center gap-1 md:gap-2 flex-wrap"
					>
						منذ {content?.created && <span className="text-primary text-sm md:text-base font-bold">{arTimeAgo({date: new Date(content?.created).getTime()}).split('منذ')[1]}</span>}
					</p>
				</div>

				{/* Content */}
				<div
					className="flex-grow h-full flex flex-col items-start justify-start gap-1"
				>
					{/* title */}
					<div
						className="w-full pb-2"
					>
						<p
							className="text-xl md:text-3xl font-bold"
						>
							{content?.title}
						</p>
					</div>
					{/* tags */}
					<div
						className="flex flex-row gap-2 flex-wrap"
					>
						{content?.tagSet?.edges?.map(edge => {
							return (
								<div
									className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full border-2 border-primary"
								>
									<p
										className="text-sm md:text-base inline-block font-semibold text-secondary"
									>
										{edge?.node?.title}
									</p>
								</div>
							)
						})}
					</div>
					<div className="border-b border-secondary-200 w-full mb-1"></div>

					{/* body */}
					<div
						className="h-full w-full"
					>
						<TextEditor 
							readonly={true} 
							value={content?.body} />
					</div>

				</div>
			</div>
		</div>
		
	)
}

export default GenericDetail;