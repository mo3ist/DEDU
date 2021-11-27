import React from "react"
import { Link, useLocation } from "react-router-dom"

import { GetLectures_lectures_edges } from './__generated__/GetLectures'

const arTimeAgo = require('artimeago')

interface Props {
	lecture: GetLectures_lectures_edges 
}

const LectureListItem: React.FC<Props> = ({ lecture }) => {

	const location = useLocation()

	return (
		<div
			className="h-54 bg-secondary-100 flex flex-col gap-1 p-1 rtl text-secondary border-2 border-secondary-200 rounded-lg"
		>
			{/* upper part */}
			<div
				className="flex-grow flex flex-row gap-1 p-1"
			>
				{/* title + user data */}
				<div
					className="flex-grow flex flex-col items-start justify-center gap-1 w-4/6"
				>
					<p
						className="flex-grow text-lg font-bold bg-secondary-200 border-r-4 border-secondary pr-4 py-2 flex items-center w-full"
					>
						<Link to={`${location.pathname}detail/${lecture?.node?.id!}`}>
							{lecture.node?.title}
						</Link>
					</p>
					<div
						className="flex-grow flex items-center justify-start gap-2"
					>
						{lecture.node?.teachers?.edges.map(edge => {
							return (
							<p
								className="font-semibold border-b border-secondary"
							>
								{edge?.node?.title}
							</p>
							)
						})}
					</div>
					<div
						className="flex-grow flex items-center justify-start gap-1 p-4"
					>
						<p
							className="text-md"
						>
							العشوائية أو العشاوة (بالإنجليزية: Randomness)‏ كلمة مشتقة من فعل عَشُوَ وعَشَا عَشْوًا; وتعني من ساء بصره بالليل والنهار أو من أبصر بالنهار ولم يبصر في الليل. فالعشاوة هي سوء البصر ليلا ونهارا أو ليلا فقط. تستعمل هذه الكلمة في العلوم للتعبير عن انعدام الغرض والغاية
						</p>
					</div>
				</div>
				{/* date */}
				<div
					className="bg-secondary-100 w-1/6 pr-4"
				>
					<p
						className="text-xl flex items-center gap-2"
					>
						منذ <span className="text-primary font-bold">{arTimeAgo({date: new Date(lecture.node?.created).getTime()}).split('منذ')[1]}</span>
					</p>
					{lecture.node?.questionCount! > 0 && <p
						className="text-xl flex items-center gap-2"
					>
						<span className="text-primary font-bold">{lecture.node?.questionCount}</span>سؤال
					</p>}
					{lecture.node?.summaryCount! > 0 && <p
						className="text-xl flex items-center gap-2"
					>
						<span className="text-primary font-bold">{lecture.node?.summaryCount}</span>ملخص
					</p>}
					{lecture.node?.resourceCount! > 0 && <p
						className="text-xl flex items-center gap-2"
					>
						<span className="text-primary font-bold">{lecture.node?.resourceCount}</span>مصدر
					</p>}
				</div>
			</div>

			{/* lower part (tags) */}
			<div
				className="flex-grow flex flex-row justify-start gap-4 p-1"
			>
						{lecture.node?.tagSet?.edges?.filter(edge => edge?.node?.tagType === "CHAPTER").map(edge => {
							return (
								<div
									className="flex flex-row items-center justify-center gap-2 text-secondary bg-secondary-200 border-2 border-secondary px-2 py-1 rounded-full"
								>
									<p
										className="inline-block font-semibold text-secondary"
									>
										{edge?.node?.title}
									</p>
								</div>
							)
						})}
						{/* <div
							className="flex flex-row items-center justify-center gap-2 text-secondary bg-secondary-200 border-2 border-secondary px-2 py-1 rounded-full"
						>
							<p
								className="inline-block font-semibold text-secondary"
							>
								{lecture?.node?.lectureType}
							</p>
						</div> */}
			</div>
			
			<p
				className="border-b border-primary w-full text-primary font-semibold"
			>
				المفاهيم:
			</p>
			<div
				className="flex-grow flex flex-row justify-start gap-4 p-1"
			>
				{lecture.node?.tagSet?.edges?.filter(edge => edge?.node?.tagType === "CONCEPT").map(edge => {
					return (
						<div
							className="flex flex-row items-center justify-center gap-2 text-secondary bg-primary-100 px-2 py-1 rounded-full border-2 border-primary"
						>
							<p
								className="inline-block font-semibold"
							>
								{edge?.node?.title}
							</p>
						</div>
					)
				})}
			</div>

		</div>
	)
}

export default LectureListItem;