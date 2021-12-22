import React, { useEffect, useRef, useState } from "react";

import "./quiz-nav.css"

interface Props {
	quizIds: string[] | null
	activeIndex: number
	setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

const QuizNav: React.FC<Props> = ({ quizIds, activeIndex, setActiveIndex }) => {

	const BUTTON_NUMBER = Math.min(quizIds?.length!, 2)

	const [activeQuizIds, setActiveQuizIds] = useState<string[] | null>(null)
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);

	const [inputClicked, setInputClicked] = useState(false)

	const getActiveQuizIds = ( index = activeIndex ) => {
		var start = index - BUTTON_NUMBER >= 0 ? (index - BUTTON_NUMBER)+1 : 0;
		var end = index + BUTTON_NUMBER <= quizIds?.length! -1 ? (index + BUTTON_NUMBER)+1 : quizIds?.length;

		setStart(start)
		setEnd(end!)

		return quizIds?.slice(start, end)
		// return before.concat(after)
	}

	useEffect(() => {
		setActiveQuizIds(getActiveQuizIds(activeIndex)!)
	}, [activeIndex])

	const inputRef = useRef<HTMLInputElement>(null)
	const inputButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<div
			className="w-full flex flex-row items-center justify-center rtl flex-wrap gap-2"
		>
			{/* First */}
			<div
				className="flex-grow flex items-center justify-start gap-1 order-2 md:order-1"
			>
				<button
					className="quiz-nav-button"
					onClick={() => {
						setActiveIndex(0)
						setActiveQuizIds(getActiveQuizIds(0)!)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="quiz-nav-icon" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
						<path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
					</svg>
				</button>
				<button
					className="quiz-nav-button"
					onClick={() => {
						setActiveIndex(Math.max(activeIndex - 1, 0))
						setActiveQuizIds(getActiveQuizIds(Math.max(activeIndex - 1, 0))!)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="quiz-nav-icon" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
					</svg>
				</button>
				{activeQuizIds?.slice(0, BUTTON_NUMBER).map((id, index) => {
					return (
						<button
							className="quiz-nav-button"
							onClick={() => {
								setActiveIndex(start + index)
								setActiveQuizIds(getActiveQuizIds(start + index)!)
							}}
						>
							{start + index+1}
						</button>
					)
				})}
			</div>

			{/* Choice */}
			<div
				className="flex items-center justify-center gap-1 rounded-lg bg-secondary-100 w-full md:w-2/6 order-1 md:order-2 p-1"
			>
				<div
					className="w-2/6 h-8 flex items-center"
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							const value = inputRef.current?.value
							setActiveIndex(Number.parseInt(value!)-1)
							setActiveQuizIds(getActiveQuizIds(Number.parseInt(value!)-1)!)

							setInputClicked(false)

						}}
						className="h-full w-full"
					>
						{inputClicked && <input 
							type="text" 
							className="outline-none w-full h-full md:h-8 p-1 rounded-lg text-center bg-secondary-200 flex items-center justify-center placeholder-secondary"
							ref={inputRef}
							onBlur={() => {
								setInputClicked(false)
							}}

							// cause of cond rendering, focus after click
							autoFocus={true}
							onChange={(e) => {
								const value = e.currentTarget.value
								var isNumber = Number.isInteger(Number(value)) && value !== "";
								// if (value == "") {
								// 	setActiveIndex(0)
								// }
								if (isNumber){
									e.currentTarget.value = Math.max(1, Math.min(Number.parseInt(inputRef.current?.value!), quizIds?.length!)).toString()
								}
							}}
						/>}
						{!inputClicked && <button
							className="w-full h-full md:h-8 p-1 rounded-lg text-center bg-secondary-200 flex items-center justify-center shadow-md font-bold"
							ref={inputButtonRef}
							onClick={(e) => {
								setInputClicked(true)
							}}
						>
							{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg> */}
							{activeIndex + 1}
						</button>}
					</form>
					<p
						className="inline p-1 w-1/2"
					>
						/ {quizIds?.length}
					</p>
				</div>
					
			</div>

			{/* Last */}
			<div
				className="flex-grow flex items-center justify-end gap-1 order-3"
			>
				{activeQuizIds?.slice(-BUTTON_NUMBER).map((id, index) => {
					return (
						<button
							className="quiz-nav-button"
							onClick={() => {
								setActiveIndex(end-BUTTON_NUMBER + (index))
								setActiveQuizIds(getActiveQuizIds(end-BUTTON_NUMBER + (index))!)
							}}
						>
							{end-BUTTON_NUMBER + (index+1)}
						</button>
					)
				})}
				<button
					className="quiz-nav-button"
					onClick={() => {
						setActiveIndex(Math.min(activeIndex + 1, quizIds?.length!-1))
						setActiveQuizIds(getActiveQuizIds(Math.min(activeIndex + 1, quizIds?.length!-1))!)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="quiz-nav-icon" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
					</svg>
				</button>
				<button
					className="quiz-nav-button"
					onClick={() => {
						setActiveIndex(quizIds?.length! - 1)
						setActiveQuizIds(getActiveQuizIds(quizIds?.length!-1)!)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="quiz-nav-icon" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
					</svg>
				</button>
			</div>
		</div>
	)
}

export default QuizNav;