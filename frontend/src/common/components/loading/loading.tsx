import React from "react"

interface Props {

}

const Loading: React.FC<Props> = () => {
	return (
		<div
			className="absolute inset-0 bg-primary opacity-80 z-10 flex items-center justify-center rounded-lg"
		>
			<p
				className="text-secondary font-bold text-3xl"
			>
				...
			</p>
		</div>
	)
}

export default Loading;