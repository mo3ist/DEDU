import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom'
import classname from "classnames"

import { currentCourseVar } from "../../common/apollo-client/apollo-client";
import TagSearch from "../../common/components/tag-search/tag-search";
import { GetQuizzes, GetQuizzes_quizzes_edges_node } from "./__generated__/GetQuizzes";
import QuizItem from "./quiz-item";
import GenericListingPage from "../../common/components/generic-listing-page/generic-listing-page";

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
					created
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

	const history = useHistory()

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
			className="w-full h-full"
		>
			<GenericListingPage 
				tags={tags}
				setTags={setTags}
				ListHeader={{
					creationPath: "quiz",
					creationText: "مشاركة كويز"
				}}
			>
				<p></p>
			</GenericListingPage>
		</div>
		// <div
		// 	className="text-secondary main-margin rtl grid grid-cols-1 gap-4 md:gap-8"
		// >
		// 	{!started && <>
		// 	<div>
		// 		<div
		// 			className="rtl border-b border-primary mb-1"
		// 		>
		// 			<p
		// 				className="text-xl text-primary mb-1"
		// 			>
		// 				اختيار الكويزات
		// 			</p>
		// 		</div>
		// 		<div
		// 			className="w-full bg-secondary-200 rounded-b-lg flex flex-row items-center justify-start p-1 md:p-4"
		// 		>
		// 			<button
		// 				className="bg-secondary-100 p-2 md:p-4 rounded-lg md:text-lg font-semibold"
		// 				onClick={() => {
		// 					history.push(`/courses/${currentCourse?.code}/quiz/create/`)
		// 				}}
		// 			>
		// 				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
		// 					<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
		// 				</svg>
		// 				إضافة كويز
		// 			</button>
		// 		</div>
		// 	</div>
		// 	<TagSearch 
		// 		courseCode={currentCourse?.code!}
		// 		setTags={setTags}
		// 		tags={tags}
		// 	/>
		// 	<button
		// 		className={classname("relative rounded-lg p-4 w-full bg-primary font-semid text-2xl md:text-3xl", {"opacity-50 cursor-not-allowed": tags?.length === 0})}
		// 		onClick={() => {
		// 			if(data?.quizzes?.edges.length! > 0) {
		// 				setStarted(true)
		// 			} 
		// 		}}
		// 	>
		// 		بدأ
				
		// 		<p
		// 			className="absolute text-base bottom-1 right-1"
		// 		>
		// 			تم اختيار <span className="font-semibold text-secondary-100 text-sm md:text-base">{data?.quizzes?.edges.length || 0}</span> سؤال  
		// 		</p>
		// 	</button>
		// 	</>}
		
		// 	{started && data && <div
		// 		className="w-full h-full flex flex-col gap-2"
		// 	>
		// 		<div
		// 			className="col-span-2"
		// 		>
		// 			{/* The 'key' attribute is so fucking important here, it tells react to re-initialize the component and don't cache it when quizIndex changes */}
		// 			<QuizItem quiz={quizzes![quizIndex]?.node!} key={quizIndex}/>
		// 		</div>
		// 		<div
		// 			className="flex flex-row items-center justify-center"
		// 		>
		// 			<button
		// 				className={classname("h-16 w-20 bg-secondary-200 text-xl font-semibold rounded-lg justify-self-start", {"opacity-50 cursor-not-allowed": quizIndex === 0})}
		// 				disabled={quizIndex === 0}
		// 				onClick={() => {
		// 					setQuizIndex(Math.max(0, quizIndex-1))
		// 				}}
		// 			>
		// 				السابق
		// 			</button>
		// 			<div
		// 				className="flex-grow flex place-content-center"
		// 			>
		// 				<p
		// 					className="text-secondary-100"
		// 				>
		// 					{quizIndex+1}/{data?.quizzes?.edges.length}
		// 				</p>
		// 			</div>
		// 			<button
		// 				className={classname("h-16 w-20 bg-secondary-200 text-xl font-semibold rounded-lg", {"opacity-50 cursor-not-allowed": quizIndex === (data?.quizzes?.edges.length!-1 || 0)})}
		// 				disabled={quizIndex === data?.quizzes?.edges.length!}
		// 				onClick={() => {
		// 					setQuizIndex(Math.min(data?.quizzes?.edges.length!-1, quizIndex+1))
		// 				}}
		// 			>
		// 				التالي
		// 			</button>
		// 		</div>
		// 	</div>}
		// </div>
	)
}

export default QuizListing;