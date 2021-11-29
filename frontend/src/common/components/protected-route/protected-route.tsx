import { useReactiveVar } from "@apollo/client"

import { Redirect, Route, RouteProps } from 'react-router';
import { currentUserVar } from "../../apollo-client/apollo-client";

type Props = {

} & RouteProps

const ProtectedRoute = ({ ...props } : Props) => {

	const currentUser = useReactiveVar(currentUserVar)
	if (currentUser) {
		return <Route {...props} />
	} else {
		return <Redirect to={"/auth"} />
	}

}

export default ProtectedRoute;