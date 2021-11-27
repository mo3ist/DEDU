import React from "react"

interface Props {

}

const Success: React.FC<Props> = () => {
	return (
		<div
			className="absolute inset-0 bg-primary opacity-80 z-10 flex items-center justify-center rounded-lg"
		>
			<p
				className="text-secondary font-bold text-3xl"
			>
				تم إرسال المشاركة وبانتظار المراجعة.
			</p>
		</div>
	)
}

export default Success;
