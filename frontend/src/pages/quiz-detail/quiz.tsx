import { useQuery, gql, useMutation, useApolloClient, useReactiveVar } from "@apollo/client"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import { currentUserVar, quizSolutionsVar } from "../../common/apollo-client/apollo-client"
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
				}
			}
		}
	}
`

const Quiz:React.FC<Props> = ({ id }) => {

	const currentUser = useReactiveVar(currentUserVar)
	const quizSolutions = useReactiveVar(quizSolutionsVar)

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
			console.log(quizSolutions?.filter(q => q.id === id).length! > 0)
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
			className="h-96 bg-secondary-100 rounded-lg flex flex-row items-start justify-center rtl p-2 md:p-4 gap-4"
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
	)
}

export default Quiz