import React from "react"
import { Link, useLocation } from "react-router-dom"

import Vote from "../../common/components/vote/vote"
import { GetSummaries_summaries_edges } from './__generated__/GetSummaries'

const arTimeAgo = require('artimeago')

interface Props {
	summary: GetSummaries_summaries_edges 
}

const SummaryListItem: React.FC<Props> = ({ summary }) => {

	const location = useLocation()

	return (
		<div
			className="h-54 bg-secondary-100 flex flex-col gap-1 p-1 rtl rounded-sm text-secondary border-2 border-secondary-200"
		>
			{/* upper part */}
			<div
				className="flex-grow flex flex-row gap-1 p-1"
			>
				{/* votes */}
				<Vote 
					contentId={summary?.node?.id!}
					voteCount={summary?.node?.voteCount!}
				/>
				{/* title + user data */}
				<div
					className="flex-grow flex flex-col items-start justify-center gap-1 w-4/6"
				>
					<p
						className="flex-grow text-xl bg-secondary-200 border-r-4 border-secondary pr-4 flex items-center w-full"
					>
						<Link to={`${location.pathname}detail/${summary?.node?.id!}`}>
							{summary.node?.title}
						</Link>
					</p>
					<div
						className="flex flex-row items-center justify-start gap-1"
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
				</div>
				{/* date */}
				<div
					className="bg-secondary-100 w-1/6 pr-4"
				>
					<p
						className="text-xl flex items-center gap-2"
					>
						منذ <span className="text-primary font-bold">{arTimeAgo({date: new Date(summary.node?.created).getTime()}).split('منذ')[1]}</span>
					</p>
				</div>
			</div>

			{/* lower part (tags) */}
			<div
				className="flex-grow flex flex-row justify-start gap-4 p-1"
			>
						{summary.node?.tagSet?.edges?.map(edge => {
							return (
								<div
									className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full"
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

export default SummaryListItem;