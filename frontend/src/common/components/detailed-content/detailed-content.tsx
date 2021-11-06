import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import JoditEditor from "jodit-react";

import { GetSummary, GetSummary_summaries_edges, GetSummary_summaries_edges_node } from "./__generated__/GetSummary";
import { GetQuestion, GetQuestion_questions_edges, GetQuestion_questions_edges_node } from "./__generated__/GetQuestion";
import { GetResource, GetResource_resources_edges, GetResource_resources_edges_node } from "./__generated__/GetResource";
import Vote from "../vote/vote"
import TextEditor from "../text-editor/text-editor";

const arTimeAgo = require('artimeago')

enum ContentType {
	resource,
	summary,
	question
}

interface Props {
	contentType: ContentType
	contentId: string
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

const GET_RESOURCE = gql`
	query GetResource($id: ID) {
		resources(id: $id) {
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

const GET_SUMMARY = gql`
	query GetSummary($id: ID) {
		summaries(id: $id) {
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

const DetailedContent: React.FC<Props> = ({ contentType, contentId }) => {

	const [getQuestion, {data: questionData, loading: questionLoading, error: questionError}] = useLazyQuery<GetQuestion>(GET_QUESTION, {
		onCompleted: (data) => {
			setContent(data.questions?.edges[0]?.node || null)
		}
	})
	const [getResource, {data: resourceData, loading: resourceLoading, error: resourceError}] = useLazyQuery<GetResource>(GET_RESOURCE, {
		onCompleted: (data) => {
			setContent(data.resources?.edges[0]?.node || null)
		}
	})
	const [getSummary, {data: summaryData, loading: summaryLoading, error: summaryError}] = useLazyQuery<GetSummary>(GET_SUMMARY, {
		onCompleted: (data) => {
			setContent(data.summaries?.edges[0]?.node || null)
		}
	})

	const [content, setContent] = useState<GetQuestion_questions_edges_node | GetResource_resources_edges_node | GetSummary_summaries_edges_node | null>(null)

	useEffect(() => {
		switch (contentType) {
			case ContentType.question:
				getQuestion({
					variables: {
						id: contentId
					}
				})
				break;
			
			case ContentType.resource:
				getResource({
					variables: {
						id: contentId
					}
				})
				break;

			case ContentType.summary:
				getSummary({
					variables: {
						id: contentId
					}
				})
				break;
		}
	}, [])

	

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
						contentId={contentId}
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

export default DetailedContent;