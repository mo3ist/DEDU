import React, { useEffect } from "react"
import { useHistory } from "react-router"

interface Props {
	redirectUrl?: string
}

const Success: React.FC<Props> = ({ redirectUrl }) => {

	const history = useHistory()

	useEffect(() => {
		setTimeout(() => {
			if (redirectUrl) {
				history.push(redirectUrl)
			}
		}, 3000)
	}, [])

	return (
		<div
			className="absolute inset-0 bg-primary opacity-90 z-10 flex flex-col items-center justify-center rounded-lg gap-8 text-secondary"
		>
			<p
				className="font-bold text-xl md:text-3xl text-center"
			>
				تم إرسال المشاركة وبانتظار المراجعة.
			</p>
			{redirectUrl && <p
				className="flex item-center justify-center"
			>
				جاري إعادة توجيهك
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" className="w-6 h-6 px-1 animate-spin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
			</p>}
			
		</div>
	)
}

export default Success;
