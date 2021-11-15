import classname from "classnames"
import React from "react"
import { Link } from "react-router-dom"

import "./navbar"

interface Props {
	title: string
	to: string
	isActive: boolean
	isDisabled: boolean
	onClick: () => void
}

const NavItem: React.FC<Props> = ({ title, to, isActive=false, onClick, isDisabled }) => {
	return (
		<button
			className={classname("nav-item", {"active": isActive})}
			key={title}
			onClick={onClick}
		>
			{isDisabled === true ? title : <Link 
				to={to}
			>
				{title}
			</Link>}
		</button>
	)
}

export default NavItem