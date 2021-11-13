import { gql, useQuery } from "@apollo/client"
import { GetIsLoggedInProtected } from "./__generated__/GetIsLoggedInProtected"

import { Redirect, Route, RouteProps } from 'react-router';

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

	const { data } = useQuery<GetIsLoggedInProtected>(GET_ISLOGGEDIN)

	if (data?.users?.isLoggedIn) {
		return <Route {...props} />
	} else {
		return <Redirect to={"/auth"} />
	}
}

export default ProtectedRoute;