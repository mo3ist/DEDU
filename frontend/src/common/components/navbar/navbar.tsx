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
			className="h-16 bg-secondary-100 w-full fixed z-20 flex flex-row items-center rtl p-1 text-secondary text-sm md:text-2xl gap-1 shadow-sm border-b-2 border-secondary"
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
					to={`${baseUrl}lecture/`}
					title="محاضرات"
					isActive={match?.content === "lecture"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				>
					<p
						className="flex flex-col md:flex-row items-center justify-center"
					>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="university" className="h-4 md:h-7 md:w-7 inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"></path></svg>
						محاضرات
					</p>
				</NavItem>
				<NavItem 
					to={`${baseUrl}summary/`}
					title="ملخصات"
					isActive={match?.content === "summary"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				>
					<p
						className="flex flex-col md:flex-row items-center justify-center"
					>
						<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" className="h-4 md:h-7 md:w-7 inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
						ملخصات
					</p>
				</NavItem>
				<NavItem 
					to={`${baseUrl}quiz/`}
					title="كويزات"
					isActive={match?.content === "quiz"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				>
					<p
						className="flex flex-col md:flex-row items-center justify-center"
					>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="puzzle-piece" className="h-4 md:h-7 md:w-7 inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"></path></svg>
						كوزيات
					</p>
				</NavItem>
				<NavItem 
					to={`${baseUrl}question/`}
					title="أسئلة"
					isActive={match?.content === "question"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				>
					<p
						className="flex flex-col md:flex-row items-center justify-center"
					>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="question" className="h-4 md:h-7 md:w-7 inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path></svg>
						أسئلة
					</p>
				</NavItem>
				<NavItem 
					to={`${baseUrl}resource/`}
					title="مصادر"
					isActive={match?.content === "resource"}
					isDisabled={currentCourse === null}
					onClick={navItemClicked}
				>
					<p
						className="flex flex-col md:flex-row items-center justify-center"
					>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="atom" className="h-4 md:h-7 md:w-7 inline md:ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M223.99908,224a32,32,0,1,0,32.00782,32A32.06431,32.06431,0,0,0,223.99908,224Zm214.172-96c-10.877-19.5-40.50979-50.75-116.27544-41.875C300.39168,34.875,267.63386,0,223.99908,0s-76.39066,34.875-97.89653,86.125C50.3369,77.375,20.706,108.5,9.82907,128-6.54984,157.375-5.17484,201.125,34.958,256-5.17484,310.875-6.54984,354.625,9.82907,384c29.13087,52.375,101.64652,43.625,116.27348,41.875C147.60842,477.125,180.36429,512,223.99908,512s76.3926-34.875,97.89652-86.125c14.62891,1.75,87.14456,10.5,116.27544-41.875C454.55,354.625,453.175,310.875,413.04017,256,453.175,201.125,454.55,157.375,438.171,128ZM63.33886,352c-4-7.25-.125-24.75,15.00391-48.25,6.87695,6.5,14.12891,12.875,21.88087,19.125,1.625,13.75,4,27.125,6.75,40.125C82.34472,363.875,67.09081,358.625,63.33886,352Zm36.88478-162.875c-7.752,6.25-15.00392,12.625-21.88087,19.125-15.12891-23.5-19.00392-41-15.00391-48.25,3.377-6.125,16.37891-11.5,37.88478-11.5,1.75,0,3.875.375,5.75.375C104.09864,162.25,101.84864,175.625,100.22364,189.125ZM223.99908,64c9.50195,0,22.25586,13.5,33.88282,37.25-11.252,3.75-22.50391,8-33.88282,12.875-11.377-4.875-22.62892-9.125-33.88283-12.875C201.74516,77.5,214.49712,64,223.99908,64Zm0,384c-9.502,0-22.25392-13.5-33.88283-37.25,11.25391-3.75,22.50587-8,33.88283-12.875C235.378,402.75,246.62994,407,257.8819,410.75,246.25494,434.5,233.501,448,223.99908,448Zm0-112a80,80,0,1,1,80-80A80.00023,80.00023,0,0,1,223.99908,336ZM384.6593,352c-3.625,6.625-19.00392,11.875-43.63479,11,2.752-13,5.127-26.375,6.752-40.125,7.75195-6.25,15.00391-12.625,21.87891-19.125C384.7843,327.25,388.6593,344.75,384.6593,352ZM369.65538,208.25c-6.875-6.5-14.127-12.875-21.87891-19.125-1.625-13.5-3.875-26.875-6.752-40.25,1.875,0,4.002-.375,5.752-.375,21.50391,0,34.50782,5.375,37.88283,11.5C388.6593,167.25,384.7843,184.75,369.65538,208.25Z"></path></svg>
						مصادر
					</p>
				</NavItem>
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
						<svg xmlns="http://www.w3.org/2000/svg" className="h-full md:h-8 md:w-8 inline md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
						</svg>
						<span className="hidden md:inline">تسجيل دخول</span>
					</Link>
				</button> :
				<div
					className="w-full h-full flex items-center justify-end gap-1 md:gap-2"
				>
					<img
						className="rounded-full h-8 md:h-14 hidden md:block"
						src={currentUser.profilePicture}
					/>
					<button
						className={classname("nav-button", {"active": location.pathname === "/logout"})} 
					>
						<Link
							to="/logout"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-full md:h-8 md:w-8 inline md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
							<span className="hidden md:inline">تسجيل خروج</span>
						</Link>
					</button>
					
				</div>}
			</div>
			
		</div>
	)
}

export default Navbar