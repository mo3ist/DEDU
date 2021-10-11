import { gql, useQuery } from "@apollo/client";
import React from "react"
import ReactMarkdown from 'react-markdown'


import { GetCourseOutline } from "./__generated__/GetCourseOutline";

interface Props {
	activeCourseId: string;
}

const GET_COURSE_OUTLINE = gql`
	query GetCourseOutline($id: ID) {
		courses(id: $id) {
			edges {
				node {
					outline
				}
			}
		}
	}
`;

export const CourseOutline: React.FC<Props> = ({ activeCourseId }) => {

	const { loading, error, data } = useQuery<GetCourseOutline>(GET_COURSE_OUTLINE, {
		variables: {
			id: activeCourseId 
		}
	})

	return (
		<div
			className="bg-secondary-100 p-4"
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