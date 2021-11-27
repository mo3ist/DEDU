import React from "react"
import { gql, useQuery } from "@apollo/client"
import { GetIsLoggedIn } from "./__generated__/GetIsLoggedIn"
import { useHistory } from "react-router-dom"


interface Props{
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	children?: React.ReactNode
	className?: string
}

const GET_ISLOGGEDIN = gql`
	query GetIsLoggedIn{
		users {
			currentUser @client {
				id
			} 
		}
	}
`

const ProtectedButton: React.FC<Props> = ({ onClick, children, className }) => {

	const { data } = useQuery<GetIsLoggedIn>(GET_ISLOGGEDIN)
	const history = useHistory()


	return (
		<>
			<button
				className={className}
				onClick={(event) => {
					// Check auth
					data?.users?.currentUser?.id.length !== 0 ? onClick(event) : history.push("/auth")
				}}
			>
				{children}
			</button>
		</>
	)
}

export default ProtectedButton;