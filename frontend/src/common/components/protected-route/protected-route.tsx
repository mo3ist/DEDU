import { gql, useQuery } from "@apollo/client"
import { GetIsLoggedInProtected } from "./__generated__/GetIsLoggedInProtected"

import { Redirect, Route, RouteProps } from 'react-router';
import Loading from "../loading/loading";

type Props = {

} & RouteProps

const GET_ISLOGGEDIN = gql`
	query GetIsLoggedInProtected{
		users {
			isLoggedIn @client
		}
	}
`

const ProtectedRoute = ({ ...props } : Props) => {

	const { loading, error, data } = useQuery<GetIsLoggedInProtected>(GET_ISLOGGEDIN)

	if (loading) {
		return(
			<div
				className="h-screen"
			>
				<Loading />
			</div>
		) 
	} else {
		if (data?.users?.isLoggedIn) {
			return <Route {...props} />
		} else {
			return <Redirect to={"/auth"} />
		}
	}
}

export default ProtectedRoute;