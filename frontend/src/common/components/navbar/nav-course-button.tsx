import classname from "classnames"
import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { gql, useLazyQuery, useQuery } from "@apollo/client"

import "./navbar"
import { GetButtonCourse } from "./__generated__/GetButtonCourse"
import { currentClassificationVar, CurrentCourse, currentCourseVar } from "../../apollo-client/apollo-client"

interface Props {
	forceChoice: boolean
	courseCode: string
	currentCourse: CurrentCourse | null
	isActive: boolean
}

const GET_BUTTON_COURSE = gql`
	query GetButtonCourse($courseCode: String!) {
		courses (code: $courseCode) {
			edges {
				node {
					id 
					title
					code
					classificationSet {
						edges {
							node {
								id
								code
								title
							}
						}
					}
				}
			}
		}
	}
`

const NavCourseButton: React.FC<Props> = ({ forceChoice, courseCode, currentCourse, isActive }) => {

	const [getButtonCourse, { loading, error, data }] = useLazyQuery<GetButtonCourse>(GET_BUTTON_COURSE, {
		variables: {
			courseCode: courseCode
		},
		onCompleted(data) {
			const cls = data.courses?.edges[0]?.node?.classificationSet.edges[0]?.node
			currentClassificationVar({
				id: cls?.id!,
				code: cls?.code!,
				title: cls?.title!
			})

			const course = data.courses?.edges[0]?.node
			currentCourseVar({
				id: course?.id!,
				code: course?.code!,
				title: course?.title!
			})
		}
	})

	useEffect(() => {
		if (currentCourse === null) {
			getButtonCourse()
		}
	}, [])

	return (
			<div
				className={classname("nav-button-container", {"border-2 border-primary border-dashed rounded-lg": forceChoice})}
			>
				<button
					className={classname("nav-button", {"active": isActive})}
				>
					<Link
						to="/courses/"
					>
						{currentCourse?.title || "اختر الكورس"}
					</Link>
				</button>
			</div>
	)
}

export default NavCourseButton