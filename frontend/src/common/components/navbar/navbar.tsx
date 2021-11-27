import { useReactiveVar } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Link, matchPath, useLocation, useHistory } from "react-router-dom"
import classname from "classnames"

import { currentCourseVar, currentUserVar } from "../../apollo-client/apollo-client"
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

	const history = useHistory()
	const currentUser = useReactiveVar(currentUserVar)

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
			className="h-16 bg-secondary-100 w-full fixed z-20 flex flex-row items-center rtl p-1 text-secondary text-2xl gap-1 shadow-sm border-b-2 border-secondary"
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
					to={`${baseUrl}question/`}
					title="أسئلة"
					isActive={match?.content === "question"}
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
				{!currentUser ? 
				<button
					className={classname("nav-button", {"active": location.pathname === "/auth"})} 
				>
					<Link
						to="/auth"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
						تسجيل دخول
					</Link>
				</button> :
				<div
					className="w-full h-full flex items-center justify-end gap-2"
				>
					<img
						className="rounded-full h-full"
						src={currentUser.profilePicture}
					/>
					<button
						className={classname("nav-button", {"active": location.pathname === "/logout"})} 
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
						</svg>
						<Link
							to="/logout"
						>
							تسجيل خروج
						</Link>
					</button>
					
				</div>}
			</div>
			
		</div>
	)
}

export default Navbar