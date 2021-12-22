import { useQuery, gql, useMutation, useApolloClient, useReactiveVar } from "@apollo/client"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { currentCourseVar, currentUserVar, quizSolutionsVar } from "../../common/apollo-client/apollo-client"
import Loading from "../../common/components/loading/loading"
import TextEditor from "../../common/components/text-editor/text-editor"
import Vote from "../../common/components/vote/vote"
import { CreateSolution } from "./__generated__/CreateSolution"
import { GetQuiz, GetQuiz_quizzes_edges_node } from "./__generated__/GetQuiz"

const arTimeAgo = require('artimeago')

interface Props {
	id: string
}

const CREATE_SOLUTION = gql`
	mutation CreateSolution($quiz: String!, $answer: String!) {
		createSolution(input: {
			quiz: $quiz,
			answer: $answer
		}) {
			solution {
				id
				answer
				correct
				quiz {
					id
					solutionSet {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
	}
`

const GET_QUIZ = gql`
	query GetQuiz($id: ID) {
		quizzes(id: $id){
			edges {
				node {
					id
 					title
 					a
 					b
 					c
 					d
 					answer
 					solutionSet {
 						edges {
 							node {
 								id
 								answer
 								correct
 							}
 						}
 					}
 					voteCount
 					userVote
 					created
 					user {
 						name
 						profilePicture
 					}
					mod {
						id
						state	
					}
				}
			}
		}
	}
`

const Quiz:React.FC<Props> = ({ id }) => {

	const currentUser = useReactiveVar(currentUserVar)
	const quizSolutions = useReactiveVar(quizSolutionsVar)
	const currentCourse = useReactiveVar(currentCourseVar)
	const history = useHistory()

	const { data, loading, error } = useQuery<GetQuiz>(GET_QUIZ, {
		variables: {
			id: id
		}
	})

	const [createSolution, { data: solutionData, loading: solutionLoading, error: solutionError }] = useMutation<CreateSolution>(CREATE_SOLUTION)
	
	const [quiz, setQuiz] = useState<GetQuiz_quizzes_edges_node | null>(null)

	const [value, setValue] = useState("")
	const [reveal, setReveal] = useState(false)

	useEffect(() => {
		if (!currentUser) {
			setValue(quizSolutions?.filter(q => q.id === id)[0]?.answer!)
			setReveal(quizSolutions?.filter(q => q.id === id).length! > 0)
		}
			
	}, [])

	useEffect(() => {
		if (data && currentUser) {
			setValue(data?.quizzes?.edges[0]?.node?.solutionSet.edges[0]?.node?.answer || "")
			setReveal(data?.quizzes?.edges[0]?.node?.solutionSet.edges.length! > 0)
			
		}
		setQuiz(data?.quizzes?.edges[0]?.node!)
	}, [data])

	useEffect(() => {
		if (solutionData && currentUser) {
			setValue(solutionData?.createSolution?.solution?.answer || "")
	
			// THIS PIECE OF SHIT OF A LINE RIGHT HERE WASTED ME ABOUT 1 HOUR
			// THIS WILL BE EXECUTED AT LEAST ONCE, SO, THE OLD CODE:
			// solutionData?.createSolution?.solution !== null WOULD EVALUATE TO TRUE
			// undefined !== null.
			// fuck you
			setReveal(solutionData?.createSolution?.solution ? true : false)
		}
	}, [solutionData])

	useEffect(() => {
	}, [value, reveal])

	if (loading || !quiz) {
		return (
			<div
				className="h-96 relative"
			>
				<Loading />
			</div>
		)
	}

	return (
		<div
			className={classNames("grid grid-cols-1 rtl", {
				"border-r border-primary pr-1": currentUser?.name === quiz?.user.name 
			})}
		>

			{currentUser?.name === quiz?.user.name && 
			<div
				className="w-full flex flex-row items-center justify-start gap-1" 
			>
				{quiz?.mod?.state != "REJECTED" && <button
					className="bg-primary-100 py-1 px-2 rounded-t-lg text-sm md:text-base flex items-center justify-center rtl"
					onClick={() => {
						history.push(`/courses/${currentCourse?.code}/quiz/edit/${id}/`)
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
					</svg>
					تعديل
				</button>}
				
				<p
					className={classNames("py-1 px-2 rounded-t-lg text-sm md:text-base", {
						"bg-yellow-300 text-secondary": quiz?.mod?.state === "PENDING",
						//"bg-green-600": quiz?.mod?.state === "APPROVED",
						"bg-red-800 text-secondary-100": quiz?.mod?.state === "REJECTED",
						
					})}
				>
					{quiz?.mod?.state === "PENDING" && "قيد المراجعة"}
					{quiz?.mod?.state === "REJECTED" && "مرفوض"}
				</p>
			</div>}

			<div
				// className="h-96 bg-secondary-100 rounded-lg flex flex-row items-start justify-center rtl p-2 md:p-4 gap-4"
				className={classNames("h-96 bg-secondary-100 flex flex-row items-start justify-center rtl p-2 md:p-4 gap-4", 
				{
					"rounded-tl-lg rounded-b-lg": currentUser?.name === quiz?.user.name,
					"rounded-lg": currentUser?.name !== quiz?.user.name,
				})}
			>
				{/* votes and user data */}
				<div
					className="flex flex-col items-start justify-center gap-1 w-14 md:w-36"
				>
					<Vote
						contentId={quiz?.id!}
						voteCount={quiz?.voteCount!}	
						userVote={quiz?.userVote!}
					/>
					<div
						className="w-full flex flex-col items-start justify-center gap-1"
					>
						<div
							className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full overflow-hidden"
						>
							<img src={quiz?.user.profilePicture!} alt="" />
						</div>
						<p
							className="font-semibold text-sm md:text-base w-full whitespace-pre-wrap truncate" 
						>
							{quiz?.user?.name}
						</p>

						<p
							className="flex items-center gap-1 md:gap-2 flex-wrap"
						>
							منذ <span className="text-primary text-sm md:text-base font-bold">{arTimeAgo({date: new Date(quiz?.created).getTime()}).split('منذ')[1]}</span>
						</p>
					</div>
				</div>

				{/* quiz data */}
				<div
					className="flex-grow flex flex-col items-start justify-cente h-full gap-2"
				>
					<div
						className="md:text-xl font-semibold h-2/6"
					>
						<TextEditor
							value={quiz?.title!}
							readonly={true}
						/>
					</div>
					<div
						className="relative flex-grow w-full"
					>
						<div
							className="grid grid-cols-2 gap-1 md:gap-4 p-1 h-full"
						>
							{[quiz?.a, quiz?.b, quiz?.c, quiz?.d].map(option => {
								return (
									<label className={classNames("text-sm md:text-lg", {"text-green-800": reveal && option === quiz?.answer, "text-red-800": reveal && option === value})}>
										<input 
											type="radio" 
											name="option" 
											className="ml-1 md:ml-2 w-5 h-5 inline"
											disabled={reveal}
											onClick={() => setValue(option!)}
											checked={option == value}
										/>
										{option}
									</label>
								)
							})}
						</div>
						{reveal && <div
							className={classNames("absolute inset-0 z-10 opacity-30 rounded-lg flex items-center justify-center", {"bg-green-50": value === quiz?.answer, "bg-red-50": value !== quiz?.answer})}
						>
							<p
								className="text-secondary text-xl md:text-3xl font-bold"
							>
								{value === quiz?.answer && "إجابة صحيحة"}
								{value !== quiz?.answer && "إجابة خاطئة"}
							</p>
						</div>}
					</div>
					<button
						className={classNames("h-16 w-full bg-primary text-xl font-semibold rounded-lg", {"opacity-50 cursor-not-allowed": reveal})}
						disabled={reveal}
						onClick={() => 
							{
								if (value) {
									if (currentUser){
										createSolution({
											variables: {
												quiz: quiz?.id,
												answer: value
												}
											})
									} 
									else {
										const solution = {
											id: quiz.id,
											answer: value
										}
										const solutions = quizSolutions || [] 
										quizSolutionsVar(solutions?.concat(solution))
										localStorage.setItem("quizSolutionsVar", JSON.stringify(solutions?.concat(solution)))
										setReveal(true)
									}
								}
							}
						}
					>
						{/* {!reveal && "تحقق"}
						{reveal && value === quiz?.answer && "إجابة صحيحة"}
						{reveal && value !== quiz?.answer && "إجابة خاطئة"} */}
						تحقق
					</button>
				</div>
			</div>
		</div>
		
	)
}

export default Quiz