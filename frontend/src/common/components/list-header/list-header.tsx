import React from "react"
import { useHistory } from "react-router"

interface Props {
	showFilter: boolean
	setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
	creationText: string
	creationPath: string
}

const ListHeader: React.FC<Props> = ({ showFilter, setShowFilter, creationText, creationPath }) => {

	const history = useHistory()

	return (
		<div
			className="w-full h-full flex flex-row items-center justify-center gap-2"
		>
			<button
				className="rounded-lg bg-primary p-2 flex flex-row items-center justify-center gap-1 text-base md:text-lg"
				onClick={() => {
					setShowFilter(!showFilter)
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
				</svg>
				فلتر
			</button>
			<button
				className="rounded-lg bg-primary p-2 flex flex-row items-center justify-center gap-1 md:text-lg"
				onClick={() => {
					history.push(creationPath)
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
				</svg>
				{creationText}
			</button>
		</div>
	)
}

export default ListHeader