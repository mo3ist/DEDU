import React from "react"
import { GetDetailedLecture_lectures_edges_node_tagSet } from "./__generated__/GetDetailedLecture"

interface Props {
	tags: GetDetailedLecture_lectures_edges_node_tagSet
}

const Concepts: React.FC<Props> = ({ tags }) => {
	return (
		<div
			className="h-96 bg-secondary-100 rounded-lg flex flex-col"
		>
			<div
				className="flex-grow overflow-hidden rounded-t-lg border-b border-secondary"
			>
				<div
					className="overflow-y-scroll h-full w-full p-2"
				>
					{tags?.edges?.map(edge => {
						return (
							<div
								className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full border-2 border-primary"
								key={edge?.node?.title}
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
			<button
				className="flex-initial rounded-lg bg-secondary-200 border border-secondary py-2 m-1 font-semibold text-lg"
			>
				كويز على المفاهيم
			</button>
		</div>
	)
}

export default Concepts