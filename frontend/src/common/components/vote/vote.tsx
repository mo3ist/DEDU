import React from "react"
import ProtectedButton from "../protected-button/protected-button";

interface Props {
	contentId: string;
	voteCount: number;
}

const Vote: React.FC<Props> = ({ contentId, voteCount }) => {
	return (
		<div
			className="flex flex-col w-10 items-center justfiy-center"
		>
			{/* upvote */}
			<ProtectedButton
				onClick={() => {}}
				className="flex-grow"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
				</svg>
			</ProtectedButton>
			<p
				className="align-middle text-2xl font-semibold"
			>
				{voteCount}
			</p>
			{/* downvote */}
			<ProtectedButton
				onClick={() => {}}
				className="flex-grow"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</ProtectedButton>
		</div>
	)
} 

export default Vote; 