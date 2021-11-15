import { useReactiveVar } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import classname from "classnames"

import { currentCourseVar } from "../../apollo-client/apollo-client"
import NavItem from "./nav-item"

import "./navbar.css"
import NavCourseButton from "./nav-course-button"

interface Props {

}

interface MatchContentPath {
	course: string
	content: string 
}

const Navbar: React.FC<Props> = () => {
	const currentCourse = useReactiveVar(currentCourseVar)
	const baseUrl = `/courses/${currentCourse?.code!}/`

	const [forceChoice, setForceChoice] = useState<boolean>(false)
	const [match, setMatch] = useState<MatchContentPath | null>(null)

	const navItemClicked = () => {
		if (currentCourse === null) {
			setForceChoice(true)
		}
	}

	const location = useLocation()

	useEffect(() => {
		if (currentCourse !== null) {
			setForceChoice(false)
		}
	}, [currentCourse])

	useEffect(() => {
		const match = matchPath<MatchContentPath | null>(location.pathname, {
			path: "/courses/:course/:content"
		}) || null

		setMatch(match?.params!)

	}, [location.pathname])

	return (
		<div
			className="h-16 bg-secondary-100 w-full fixed z-10 flex flex-row items-center rtl p-1 text-secondary text-2xl gap-1 shadow-sm border-b-2 border-secondary"
		>
			<div
				className="nav-container justify-start"
			>
				<NavCourseButton 
					forceChoice={forceChoice} 
					courseCode={match?.course!} 
					currentCourse={currentCourse} 
					isActive={location.pathname === "/courses/"}
				/>
			</div>
			<div
				className="nav-container justify-center"
			>
				<NavItem 
					title="محاضرات"
					to={`${baseUrl}lecture/`}
					isActive={match?.content === "lecture"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				/>
				<NavItem 
					to={`${baseUrl}summary/`}
					title="ملخصات"
					isActive={match?.content === "summary"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				/>
				<NavItem 
					to={`${baseUrl}quiz/`}
					title="كويزات"
					isActive={match?.content === "quiz"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				/>
				<NavItem 
					to={`${baseUrl}resource/`}
					title="مصادر"
					isActive={match?.content === "resource"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				/>
			</div>
			
			<div
				className="nav-container justify-end"
			>
				<button
					className={classname("nav-button", {"active": location.pathname === "/auth"})} 
				>
					<Link
						to="/auth"
					>
						تسجيل دخول
					</Link>
				</button>
			</div>
			
		</div>
	)
}

export default Navbar