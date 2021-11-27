import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import classname from "classnames"

import { currentCourseVar } from "../../common/apollo-client/apollo-client";
import TagSearch from "../../common/components/tag-search/tag-search";
import { GetQuizzes, GetQuizzes_quizzes_edges_node } from "./__generated__/GetQuizzes";
import QuizItem from "./quiz-item";

interface Props {

}

const GET_QUIZZES = gql`
	query GetQuizzes($tagTitle: String, $courseCode: String) {
		quizzes(tag_Title: $tagTitle, tag_Course_Code: $courseCode, course_Code: $courseCode) {
			edges {
				node {
					id
					title
					a
					b
					c
					d
					answer
					voteCount
					userVote
					userAnswer @client
					user {
						name
						profilePicture
					}
				}
			}
		}
	}
`

const QuizListing: React.FC<Props> = () => {

	const currentCourse = useReactiveVar(currentCourseVar)
	
	const [tags, setTags] = useState<Array<string> | null>([]) 
	const [started, setStarted] = useState<boolean>(false)

	const [quizIndex, setQuizIndex] = useState(0)

	const [getQuizzes, { loading, error, data }] = useLazyQuery<GetQuizzes>(GET_QUIZZES, {
		onCompleted(data) {
			// data.quizzes?.edges.length === 0 && setStarted(false)
			console.log(data)
		}
	})

	const quizzes = data?.quizzes?.edges

	useEffect(() => {
		tags?.length! > 0 && getQuizzes({
			variables: {
				courseCode: currentCourse?.code,
				tagTitle: tags?.join(",")
			}
		})
	}, [tags])

	return (
		<div
			className="text-secondary py-4 px-48 rtl grid grid-cols-1 gap-8"
		>
			{!started && <><TagSearch 
				courseCode={currentCourse?.code!}
				setTags={setTags}
				tags={tags}
			/>
			<button
				className={classname("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": tags?.length === 0})}
				onClick={() => {
					if(data?.quizzes?.edges.length! > 0) {
						setStarted(true)
					} 
				}}
			>
				بدأ
			</button>
			<p
				className="text-secondary-100"
			>
				مجموع الأسئلة: {data?.quizzes?.edges.length || 0}
			</p></>}
		
			{started && data && <div
				className="w-full h-full flex flex-col gap-2"
			>
				<div
					className="col-span-2"
				>
					{/* The 'key' attribute is so fucking important here, it tells react to re-initialize the component and don't cache it when quizIndex changes */}
					<QuizItem quiz={quizzes![quizIndex]?.node!} key={quizIndex}/>
				</div>
				<div
					className="flex flex-row items-center justify-center"
				>
					<button
						className={classname("h-16 w-20 bg-secondary-200 text-xl font-semibold rounded-lg justify-self-start", {"opacity-50 cursor-not-allowed": quizIndex === 0})}
						disabled={quizIndex === 0}
						onClick={() => {
							setQuizIndex(Math.max(0, quizIndex-1))
						}}
					>
						السابق
					</button>
					<div
						className="flex-grow flex place-content-center"
					>
						<p
							className="text-secondary-100"
						>
							{quizIndex+1}/{data?.quizzes?.edges.length}
						</p>
					</div>
					<button
						className={classname("h-16 w-20 bg-secondary-200 text-xl font-semibold rounded-lg", {"opacity-50 cursor-not-allowed": quizIndex === (data?.quizzes?.edges.length!-1 || 0)})}
						disabled={quizIndex === data?.quizzes?.edges.length!}
						onClick={() => {
							setQuizIndex(Math.min(data?.quizzes?.edges.length!-1, quizIndex+1))
						}}
					>
						التالي
					</button>
				</div>
			</div>}
		</div>
	)
}

export default QuizListing;