import React from "react"
import { GetDetailedLecture_lectures_edges_node_tagSet } from "./__generated__/GetDetailedLecture"

interface Props {
	tags: GetDetailedLecture_lectures_edges_node_tagSet
}

const Concepts: React.FC<Props> = ({ tags }) => {
	return (
		<div
			className="h-40 md:h-96 bg-secondary-100 rounded-b-lg flex flex-col"
		>
			<div
				className="flex-grow overflow-hidden border-b border-secondary-200"
			>
				<div
					className="overflow-y-scroll h-full w-full p-2 flex flex-col gap-1 md:gap-2"
				>
					{tags?.edges?.map(edge => {
						return (
							<div
								className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full border-2 border-primary"
								key={edge?.node?.title}
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
			<button
				className="flex-initial rounded-lg bg-secondary-200 py-2 px-1 m-1 font-semibold md:text-lg"
			>
				كويز على المفاهيم
			</button>
		</div>
	)
}

export default Concepts