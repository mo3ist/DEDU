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
				className={classname("nav-button-container w-full", {"border-2 border-primary border-dashed rounded-lg": forceChoice})}
			>
				<button
					className={classname("nav-button overflow-hidden w-full", {"": isActive})}
				>
					<Link
						to="/courses/"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-full md:h-10 md:w-10 inline md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path d="M12 14l9-5-9-5-9 5 9 5z" />
							<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
						</svg>
						<span className="hidden md:inline">{currentCourse?.title || "اختر الكورس"}</span>
					</Link>
				</button>
			</div>
	)
}

export default NavCourseButton