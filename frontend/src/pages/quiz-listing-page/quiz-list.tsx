import React, { useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom'

import QuizListItem from "./quiz-list-item";

interface Props {
	tags: string[] | null
}

// const GET_QUIZZES = gql`
// 	query GetQuizzes($tagTitle: String, $courseCode: String) {
// 		quizzes(tag_Title: $tagTitle, tag_Course_Code: $courseCode, course_Code: $courseCode) {
// 			edges {
// 				node {
// 					id
// 					title
// 					a
// 					b
// 					c
// 					d
// 					answer
// 					solutionSet {
// 						edges {
// 							node {
// 								id
// 								answer
// 								correct
// 							}
// 						}
// 					}
// 					voteCount
// 					userVote
// 					created
// 					userAnswer @client
// 					user {
// 						name
// 						profilePicture
// 					}
// 				}
// 			}
// 			pageInfo {
// 				startCursor
// 				endCursor
// 				hasNextPage
// 				hasPreviousPage
// 			}
// 		}
// 	}
// `

const QuizList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const courseCode = useParams<{ course: string }>().course
	// const [getQuizzes, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuizzes>(GET_QUIZZES, {
	// 	variables: {
	// 		first: FIRST,
	// 		after: after,
	// 		tag_Title: tags?.join(","),
	// 		course_Code: courseCode
	// 	}
	// });

	// useEffect(() => {
	// 	getQuizzes()
	// }, [])

	const history = useHistory()

	return (
		<div
			className="h-full w-full rtl"
		>	
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				<QuizListItem />
				{/* {data?.quizzes?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<QuizListItem 
								quiz={edge.node!}
							/>
						</div> 

					)
				})}

				{data?.quizzes?.edges.length! > FIRST && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.quizzes?.pageInfo.hasNextPage})}
						disabled={!data?.quizzes?.pageInfo.hasNextPage}
					>
						المزيد
					</button>

				} */}
			</div>
		</div>
	)
}

export default QuizList;