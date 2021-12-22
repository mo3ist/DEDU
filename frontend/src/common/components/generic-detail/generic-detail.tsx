import { gql } from "@apollo/client";
import React from "react"

import Vote from "../vote/vote"
import TextEditor from "../text-editor/text-editor";
import { GetDetailedSummary_summaries_edges_node } from "../../../pages/summary-detail/__generated__/GetDetailedSummary";
import { GetDetailedResource_resources_edges_node } from "../../../pages/resource-detail/__generated__/GetDetailedResource";
import { GetDetailedQuestion_questions_edges_node } from "../../../pages/question-detail/__generated__/GetDetailedQuestion";
import Loading from "../loading/loading";

const arTimeAgo = require('artimeago')

interface Props {
	content: GetDetailedSummary_summaries_edges_node | GetDetailedResource_resources_edges_node | GetDetailedQuestion_questions_edges_node | null
}

const GenericDetail: React.FC<Props> = ({ content }) => {

	return (
		<div
			className="h-full w-full flex flex-row items-start bg-secondary-100 gap-2 p-2 rtl text-secondary"
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
	)
}

export default GenericDetail;