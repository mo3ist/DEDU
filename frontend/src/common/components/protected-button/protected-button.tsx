import React from "react"
import { useReactiveVar } from "@apollo/client"
import { useHistory } from "react-router-dom"
import { currentUserVar } from "../../apollo-client/apollo-client"


interface Props{
	onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
	children?: React.ReactNode
	className?: string
}

const ProtectedButton: React.FC<Props> = ({ onClick, children, className }) => {

	const currentUser = useReactiveVar(currentUserVar)
	const history = useHistory()

	return (
		<>
			<button
				className={className}
				onClick={(event) => {
					// Check auth
					currentUser ? onClick(event) : history.push("/auth")
				}}
			>
				{children}
			</button>
		</>
	)
}

export default ProtectedButton;