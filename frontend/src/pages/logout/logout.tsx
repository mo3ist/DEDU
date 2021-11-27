import React, { useEffect } from "react"
import { useHistory } from "react-router"
import { currentUserVar } from "../../common/apollo-client/apollo-client"

interface Props {

}

const Logout: React.FC<Props> = () => {
	
	const history = useHistory()

	useEffect(() => {
		// Delete the user's data and redirect
		localStorage.removeItem('accessToken')
		localStorage.removeItem('currentUserVar')
		currentUserVar(null)

		history.push('/courses/')
	}, [])
	
	return (
		<div
			className="absolute inset-0 bg-primary opacity-80 z-10 flex items-center justify-center rounded-lg rtl"
		>
			<p
				className="text-secondary font-bold text-3xl"
			>
				جاري تسجيل الخروج...
			</p>
		</div>
	)
}

export default Logout;