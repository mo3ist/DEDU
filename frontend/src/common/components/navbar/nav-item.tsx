import classname from "classnames"
import React from "react"
import { Link } from "react-router-dom"

import "./navbar"

interface Props {
	to: string
	title: string
	isActive: boolean
	isDisabled: boolean
	onClick: () => void
	children?: React.ReactNode
}

const NavItem: React.FC<Props> = ({ children, title, to, isActive=false, onClick, isDisabled }) => {
	return (
		<button
			className={classname("nav-item", {"active": isActive})}
			key={title}
			onClick={onClick}
		>
			{isDisabled === true ? title : <Link 
				to={to}
			>
				{children}
			</Link>}
			
		</button>
	)
}

export default NavItem