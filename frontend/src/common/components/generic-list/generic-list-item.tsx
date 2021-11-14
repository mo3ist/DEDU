import React from "react"
import { Link, useLocation } from "react-router-dom"
import { GetQnAs_questions_edges_node } from "../../../pages/qna-listing-page/__generated__/GetQnAs"
import { GetResources_resources_edges_node } from "../../../pages/resource-listing-page/__generated__/GetResources"
import { GetSummaries_summaries_edges_node } from "../../../pages/summary-listing-page/__generated__/GetSummaries"
import Vote from "../vote/vote"

const arTimeAgo = require('artimeago')

interface Props {
	content: GetSummaries_summaries_edges_node | GetResources_resources_edges_node | GetQnAs_questions_edges_node | null
}

const GenericListItem: React.FC<Props> = ({ content }) => {

	const location = useLocation()

	return (
		<div
			className="h-54 bg-secondary-100 flex flex-col gap-1 p-1 rtl rounded-sm text-secondary rounded-lg"
		>
			{/* upper part */}
			<div
				className="flex-grow flex flex-row gap-1 p-1"
			>
				{/* votes */}
				<Vote 
					contentId={content?.id!}
					voteCount={content?.voteCount!}
					userVote={content?.userVote!}
				/>
				{/* title + user data */}
				<div
					className="flex-grow flex flex-col items-start justify-start gap-1 w-4/6"
				>
					<p
						className="text-xl font-semibold bg-secondary-200 border-r-4 border-secondary py-2 pr-1 flex items-center w-full"
					>
						<Link to={`${location.pathname}detail/${content?.id!}`}>
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
							className="text-lg"
						>
							{content?.user.name}
						</p>
					</div>
				</div>
				{/* date */}
				<div
					className="bg-secondary-100 w-1/6 pr-4"
				>
					<p
						className="text-lg flex items-center gap-2"
					>
						منذ <span className="text-primary font-semibold">{arTimeAgo({date: new Date(content?.created).getTime()}).split('منذ')[1]}</span>
					</p>
				</div>
			</div>

			{/* lower part (tags) */}
			<div
				className="flex-grow flex flex-row justify-start gap-4 p-1"
			>
						{content?.tagSet?.edges?.map(edge => {
							return (
								<div
									className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full border-2 border-primary"
								>
									<p
										className="inline-block font-semibold text-secondary"
									>
										{edge?.node?.title}
									</p>
								</div>
							)
						})}
			</div>
		</div>
	)
}

export default GenericListItem