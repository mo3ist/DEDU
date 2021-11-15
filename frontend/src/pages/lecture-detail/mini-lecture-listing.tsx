import React, { useEffect } from "react"
import { gql, useLazyQuery, useQuery, useReactiveVar } from "@apollo/client"
import classname from "classnames"

import { currentCourseVar } from "../../common/apollo-client/apollo-client"
import { GetMiniLectureList } from "./__generated__/GetMiniLectureList"
// import { useParams } from "react-router"

interface Props {
	id: string | null
	setId: React.Dispatch<React.SetStateAction<string | null>>
}

const GET_MINI_LECTURE_LIST = gql`
	query GetMiniLectureList($courseCode: String!){
		lectures(course_Code: $courseCode) {
			edges {
				node {
					id
					title
					lectureType
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

const MiniLectureListing: React.FC<Props> = ({ id, setId }) => {
	
	// const id = useParams<{id: string}>().id 
	const currentCourse = useReactiveVar(currentCourseVar)

	const [getMiniLectureList, { loading, error, data }] = useLazyQuery<GetMiniLectureList>(GET_MINI_LECTURE_LIST, {
		variables: {
			courseCode: currentCourse?.code
		}
	})

	useEffect(() => {
		if (currentCourse !== null) {
			getMiniLectureList()
		}
	}, [currentCourse])
	
	return (
		<div
			className="h-96 w-full rounded-lg overflow-hidden"
		>
			<div
				className="h-full overflow-y-scroll flex flex-col items-center justify-start bg-secondary-100 gap-2 py-2"
			>
				{data?.lectures?.edges.map(edge => {
					return (
						<button
							className={classname({"font-semibold underline text-primary": edge?.node?.id === id})}
							key={edge?.node?.id}
							onClick={() => {
								setId(edge?.node?.id!)
							}}
						>
							{edge?.node?.title}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default MiniLectureListing