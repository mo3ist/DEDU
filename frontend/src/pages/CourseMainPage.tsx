import React from "react"
import { gql, useQuery } from '@apollo/client'

interface Props {

}

const GET_COURSES = gql`
	query GetCourses {
		courses {
			edges {
				node {
					id
					title
				}
			}
		}
	}
`

export const HelloWorld: React.FC<Props> = () => {

	const { loading, error, data } = useQuery(GET_COURSES)
	return (
		<div>
			<p>Hello World from Course Main Page</p>
			{console.log(data)}
		</div>
	)
}