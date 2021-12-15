import { useReactiveVar } from "@apollo/client"
import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { currentClassificationVar, currentCourseVar, currentUserVar } from "../../common/apollo-client/apollo-client"

interface Props {

}

const Logout: React.FC<Props> = () => {
	
	const currentUser = useReactiveVar(currentUserVar)
	const history = useHistory()
	
	useEffect(() => {
		if (!currentUser){
			// If not logged in:
			history.push("/courses/")
		}
	}, [])

	return (
		<div
			className="main-margin rtl"
		>
			<div 
				className="bg-secondary-100 text-secondary grid grid-cols-1 gap-4 rounded-lg p-4 md:p-8"
			>
				<p
					className="font-semibold text-lg md:text-xl"
				>
					تأكيد تسجيل الخروج:
				</p>
				
				<button 
					onClick={() => {
						// Delete the user's data and redirect
						localStorage.removeItem('accessToken')

						localStorage.removeItem('currentUserVar')
						currentUserVar(null)
						localStorage.removeItem('currentCourse')
						currentCourseVar(null)
						localStorage.removeItem('currentClassification')
						currentClassificationVar(null)

						// SECURITY MEASUREMENT.
						window.location.reload();
					}}
					className="rounded-md bg-primary text-secondary min-w-full min-h-full font-bold text-xl md:text-2xl h-16"
				>
					تسجيل الخروج
				</button>
				
			</div>
		</div>
	)
}

export default Logout;