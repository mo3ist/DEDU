import { useReactiveVar } from "@apollo/client"
import classNames from "classnames"
import React, { useState } from "react"
import { Link, useLocation, useHistory, useRouteMatch } from "react-router-dom"
import { GetQuestions_questions_edges_node } from "../../../pages/question-listing-page/__generated__/GetQuestions"
import { GetResources_resources_edges_node } from "../../../pages/resource-listing-page/__generated__/GetResources"
import { GetSummaries_summaries_edges_node } from "../../../pages/summary-listing-page/__generated__/GetSummaries"
import { currentCourseVar, currentUserVar } from "../../apollo-client/apollo-client"
import Vote from "../vote/vote"

const arTimeAgo = require('artimeago')

interface Props {
	content: GetSummaries_summaries_edges_node | GetResources_resources_edges_node | GetQuestions_questions_edges_node | null
}

const GenericListItem: React.FC<Props> = ({ content }) => {

	const location = useLocation()
	const history = useHistory()
	const [matchParams, setMatchParams] = useState()
	const currentCourse = useReactiveVar(currentCourseVar)
	const currentUser = useReactiveVar(currentUserVar)

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
			className={classNames("grid grid-cols-1", {
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
				className={classNames("bg-secondary-100 flex flex-col gap-1 p-1 rtl text-secondary", 
				{
					"rounded-tl-lg rounded-b-lg": currentUser?.name === content?.user.name,
					"rounded-lg": currentUser?.name !== content?.user.name,

					// // ROUNDED STUFF
					// "rounded-b-lg": currentUser?.name === content?.user.name,
					// "rounded-tr-lg": content?.mod.state === "REJECTED",
					// "rounded-tl-lg": content?.mod.state === "APPROVED",
					// "rounded-lg": currentUser?.name !== content?.user.name,

				})}
			>
				{/* upper part */}
				<div
					className="flex-grow flex flex-row gap-2 p-1 flex-wrap"
				>
					{/* votes */}
					<Vote 
						contentId={content?.id!}
						voteCount={content?.voteCount!}
						userVote={content?.userVote!}
					/>
					{/* title + user data */}
					<div
						className="flex-grow flex flex-col items-start justify-start gap-1 md:gap-2 w-4/6"
					>
						<p
							className="w-full overflow-ellipsis text-md md:text-xl font-bold p-2 flex items-center rounded-lg"
						>
							<Link to={buildPath(content?.id!, "detail")}>
								{content?.title}
							</Link>
						</p>
						<div
							className="flex flex-row items-center justify-start gap-1"
						>
							<div
								className="w-10 h-10 bg-primary rounded-full overflow-hidden"
							>
								<img src={content?.user.profilePicture!} alt="" />
							</div>
							<p
								className="text-sm md:text-base"
							>
								{content?.user.name}
							</p>
						</div>

						{/* date */}
						<div
							className="flex-grow"
						>
							<p
								className="text-sm md:text-base flex items-center gap-1 flex-wrap"
							>
								منذ <span className="text-primary font-semibold md:pr-1">{arTimeAgo({date: new Date(content?.created).getTime()}).split('منذ')[1]}</span>
							</p>
							{content && "answerCount" in content && 
								<p
									className="text-sm md:text-lg flex items-center gap-1"
								>
									<span className="text-primary font-semibold">{content?.answerCount}</span> إجابة
								</p>
							}
						</div>
					</div>
					
				</div>

				{/* lower part (tags) */}
				<div
					className="flex-grow flex flex-row justify-start gap-2 p-1 flex-wrap"
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
			</div>
		</div>
	)
}

export default GenericListItem