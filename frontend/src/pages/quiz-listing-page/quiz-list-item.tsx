import React, { useEffect } from "react"
import { gql, useLazyQuery, useReactiveVar } from "@apollo/client";
import { GetQuizzesMeta } from "./__generated__/GetQuizzesMeta";
import { currentCourseVar, currentTagsVar, currentUserVar } from "../../common/apollo-client/apollo-client";
import classNames from "classnames";
import { useHistory } from "react-router";

interface Props {
	// quiz: GetQuizzes_quizzes_edges_node
}

const GET_QUIZZES_META = gql`
	query GetQuizzesMeta($tagTitle: String, $courseCode: String) {
		quizzes(tag_Title: $tagTitle, tag_Course_Code: $courseCode, course_Code: $courseCode) {
			edges {
				node {
					id
				}
			}
			totalCount
		}
	}
`

const QuizListItem: React.FC<Props> = () => {
	
	const currentCourse = useReactiveVar(currentCourseVar)
	const currentTags = useReactiveVar(currentTagsVar)
	// const currentUser = useReactiveVar(currentUserVar)

	const history = useHistory()

	const [getQuizzesMeta, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuizzesMeta>(GET_QUIZZES_META, {
		variables: {
			tagTitle: currentTags?.join(","),
			courseCode: currentCourse?.code
		}
	});

	useEffect(() => {
		getQuizzesMeta()
	}, [currentTags])

	return (
		<div
			className="flex flex-row items-center justify-center bg-secondary-100 p-1 md:p-2 rounded-lg gap-2 flex-wrap"
		>
			<div
				className="flex-grow flex flex-row items-center justify-start gap-2 md:gap-4"
			>
				<p
					className="md:text-xl flex border-b-2 border-primary"
				>
					<span className="font-bold text-primary">{data?.quizzes?.totalCount}</span> سؤال
				</p>
				<p
					className="font-semibold p-1 rounded-full"
				>
					عن
				</p>
				<div
					className="flex flex-row w-full flex-wrap overflow-hidden gap-1"
				>
					{currentTags?.slice(0, 3).map(tag => {
						return(
							<div
								className="flex flex-row items-center justify-center gap-2 text-secondary bg-secondary-200 px-2 py-1 rounded-full border-2 border-secondary"
							>
								<p
									className="text-sm md:text-base inline-block font-semibold text-secondary"
								>
									{tag}
								</p>
							</div>
						)
					})}
					{currentTags?.length! > 3 && <div
						className="flex flex-row items-center justify-center gap-2 text-secondary bg-secondary-200 px-2 py-1 rounded-full border-2 border-secondary"
					>
						<p
							className="text-sm md:text-base inline-block font-bold text-secondary italic"
						>
							+{currentTags?.length! - 3}
						</p>
					</div>}
					{!currentTags?.length && 
						<p>
							<div
								className="flex flex-row items-center justify-center gap-1 md:gap-2 text-secondary bg-secondary-200 p-1 md:px-2 md:py-1 rounded-full border-2 border-secondary"
							>
								<p
									className="text-sm md:text-base inline-block font-semibold md:font-bold italic"
								>
									كامل الكورس
								</p>
							</div>
						</p>
					}
				</div>
			</div>
			<div
				className="flex-grow flex items-center justify-end"
			>
				<button
					className="bg-primary rounded-lg p-2 md:p-4 md:text-xl w-full md:w-40 text-secondary font-semibold"
					onClick={() => {
						// Redirect to quiz page
						history.push(`/courses/${currentCourse?.code}/quiz/detail/`)
					}}
				>
					بدأ الكويز
				</button>
			</div>
		</div>
	)
}

export default QuizListItem;