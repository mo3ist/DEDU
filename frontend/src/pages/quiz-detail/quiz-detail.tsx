import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client"
import { useHistory } from "react-router";

import { currentCourseVar, currentTagsVar, currentUserVar } from "../../common/apollo-client/apollo-client";
import { GetQuizzes } from "../quiz-listing-page/__generated__/GetQuizzes";
import { GetQuizzesIds } from "./__generated__/GetQuizzesIds";
import QuizNav from "./quiz-nav";
import Loading from "../../common/components/loading/loading";
import Quiz from "./quiz";

interface Props {

}

const GET_QUIZZES_IDS = gql`
	query GetQuizzesIds($tagTitle: String, $courseCode: String) {
		quizzes(tag_Title: $tagTitle, tag_Course_Code: $courseCode, course_Code: $courseCode) {
			edges {
				node {
					id
					# title
					# a
					# b
					# c
					# d
					# answer
					# solutionSet {
					# 	edges {
					# 		node {
					# 			id
					# 			answer
					# 			correct
					# 		}
					# 	}
					# }
					# voteCount
					# userVote
					# created
					# userAnswer @client
					# user {
					# 	name
					# 	profilePicture
					# }
				}
			}
			# pageInfo {
			# 	startCursor
			# 	endCursor
			# 	hasNextPage
			# 	hasPreviousPage
			# }
		}
	}
`

const QuizDetail: React.FC<Props> = () => {
	const currentCourse = useReactiveVar(currentCourseVar)
	const currentTags = useReactiveVar(currentTagsVar)

	const history = useHistory()

	const [activeIndex, setActiveIndex] = useState(0)

	const [getQuizzesIds, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuizzesIds>(GET_QUIZZES_IDS, {
		variables: {
			tagTitle: currentTags?.join(","),
			courseCode: currentCourse?.code
		},
		fetchPolicy: "cache-only",
		onCompleted(data){
			if (!data) {
				// redirect if there's nothing in the cache (quizIds list)
				history.push(`/courses/${currentCourse?.code}/quiz/`)
			}
		}
	});

	const [quizIds, setQuizIds] = useState<string[] | null>(null)

	useEffect(() => {
		getQuizzesIds()
	}, [])

	useEffect(() => {
		setQuizIds(data?.quizzes?.edges.map(edge => edge?.node?.id!)!)
	}, [data])

	// if (loading) {
	// 	return (
	// 		<div
	// 			className="h-96 relative"
	// 		>
	// 			<Loading />
	// 		</div>
	// 	)
	// }

	return (
		<div 
			className="relative text-secondary main-margin flex flex-col items-center justify-center gap-2"
		>
			{loading && <Loading />}
			{quizIds && <><div
				className="w-full flex-grow"
			>
				<Quiz
					id={quizIds[activeIndex]}
					key={activeIndex}
				/>
			</div>
			<div
				className="flex-grow w-full"
			>
				<QuizNav 
					quizIds={quizIds}
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
				/>
			</div></>}
		</div>
	)
}

export default QuizDetail;