import React, { useEffect, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import { useHistory, useParams } from "react-router";
import GenericListItem from "../../common/components/generic-list/generic-list-item";
import classNames from "classnames";
import { GetQuestions } from "./__generated__/GetQuestions";

interface Props {
	tags: Array<String> | null
}

const GET_QUESTIONS = gql `
	query GetQuestions($first: Int, $after: String, $tag_Title: String, $course_Code: String) {
		questions(first: $first, after: $after, tag_Title: $tag_Title, tag_Course_Code: $course_Code, course_Code: $course_Code) {
			edges {
				node {
					id
					title 
					voteCount
					userVote
					answerCount
					created
					tagSet(course_Code: $course_Code) {
						edges {
							node {
								title
								tagType
							}
						}
					}
					user {
						name
						profilePicture
					}
					mod {
						state
					}
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`

const QuestionList: React.FC<Props> = ({ tags }) => {

	const FIRST = 10;
	const [ after, setAfter ] = useState<String>(""); 

	const courseCode = useParams<{ course: string }>().course
	const [getQuestions, { loading, error, data, fetchMore, refetch }] = useLazyQuery<GetQuestions>(GET_QUESTIONS, {
		variables: {
			first: FIRST,
			after: after,
			tag_Title: tags?.join(","),
			course_Code: courseCode
		}
	});

	useEffect(() => {
		getQuestions()
	}, [])

	const history = useHistory()

	return (
		<div
			className="h-full w-full text-secondary rtl"
		>	
			<div
				className="grid grid-cols-1 gap-4 md:gap-8"
			>
				{data?.questions?.edges.map(edge => {
					return (
						edge && <div
							// className="bg-secondary-100"
						>
							<GenericListItem content={edge.node} />
						</div> 

					)
				})}

				{data?.questions?.edges.length! > FIRST && 
					
					<button
						className={classNames("rounded-lg h-20 w-full bg-primary font-semid text-3xl", {"opacity-50 cursor-not-allowed": !data?.questions?.pageInfo.hasNextPage})}
						disabled={!data?.questions?.pageInfo.hasNextPage}
					>
						المزيد
					</button>

				}
			</div>
		</div>
	)
}

export default QuestionList;