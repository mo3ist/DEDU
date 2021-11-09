import { gql } from "@apollo/client";
import React from "react"

import Vote from "../vote/vote"
import TextEditor from "../text-editor/text-editor";
import { GetDetailedSummary_summaries_edges_node } from "../../../pages/summary-detail/__generated__/GetDetailedSummary";
import { GetDetailedResource_resources_edges_node } from "../../../pages/resource-detail/__generated__/GetDetailedResource";
import { GetDetailedQuestion_questions_edges_node } from "../../../pages/question-detail/__generated__/GetDetailedQuestion";

const arTimeAgo = require('artimeago')

interface Props {
	content: GetDetailedSummary_summaries_edges_node | GetDetailedResource_resources_edges_node | GetDetailedQuestion_questions_edges_node | null
}

const GET_QUESTION = gql`
	query GetQuestion($id: ID) {
		questions(id: $id) {
			edges {
				node {
					title
					body
					created
					voteCount
					tagSet {
						edges {
							node {
								title
								tagType
							}
						}
					}		
				}
			}
		}
	}
`

const GenericDetail: React.FC<Props> = ({ content }) => {

	return (
		<div
			className="h-full w-full flex flex-row items-start bg-secondary-100 gap-2 p-2 rtl text-secondary"
		>
			{/* Votes & user */}
			<div
				className="flex-initial flex flex-col items-center justify-center"
			>
				<div>
					<Vote 
						contentId={content?.id!}
						voteCount={content?.voteCount!}
					/>
				</div>
				<div
					className="flex flex-col items-center justify-start gap-1"
				>
					<div
						className="w-14 h-14 bg-primary rounded-full"
					>
						
					</div>
					<p
						className="font-semibold"
					>
						hehe
					</p>
				</div>
				<div>
					{arTimeAgo({
						date: new Date(content?.created)
					})}
				</div>
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
						className="text-3xl font-bold"
					>
						{content?.title}
					</p>
				</div>
				{/* tags */}
				<div
					className="flex flex-row gap-2 flex-wrap"
				>
					{content?.tagSet?.edges?.map(tag => {
						return (
							<div
								className="flex flex-row h-8 items-center justify-center gap-2 text-secondary bg-primary px-2 py-1 rounded-full w-20"
							>
								<p
									className="inline-block font-semibold"
								>
									{tag?.node?.title}
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