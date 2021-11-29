import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react"
import ReactMarkdown from 'react-markdown'
import { currentCourseVar } from "../../common/apollo-client/apollo-client";


import { GetCourseOutline } from "./__generated__/GetCourseOutline";

interface Props {

}

const GET_COURSE_OUTLINE = gql`
	query GetCourseOutline($id: ID) {
		courses(id: $id) {
			edges {
				node {
					id
					outline
				}
			}
		}
	}
`;

export const CourseOutline: React.FC<Props> = () => {

	const currentCourse = useReactiveVar(currentCourseVar)

	const { loading, error, data } = useQuery<GetCourseOutline>(GET_COURSE_OUTLINE, {
		variables: {
			id: currentCourse?.id 
		}
	})

	return (
		<div
			className="bg-secondary-100 p-4 rounded-lg"
		>
			<article
				className="prose"
			>
				<ReactMarkdown children={data?.courses?.edges[0]?.node?.outline!} />
			</article>
		</div>
	)
}

export default CourseOutline;