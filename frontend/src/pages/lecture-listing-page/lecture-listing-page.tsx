import classNames from "classnames";
import React, { useState } from "react"
import { useParams } from 'react-router-dom'

import TagSearch from "../../common/components/tag-search/tag-search";
import LectureList from "./lecture-list";

interface Props {

}

const LectureListingPage: React.FC<Props> = () => {

	const displays = [
		["أسابيع", "SYLLABUS"],
		["فصول", "CHAPTER"],
	]
	const [display, setDisplay] = useState<number>(0)
	const [toggleDisplayMenu, setToggleDisplayMenu] = useState<boolean>(false)

	const lectureTypes = ["", "LECTURE", "SECTION"]
	const [lectureType, setLectureType] = useState<number>(0)
	
	const params = useParams<{course: string}>()

	return (
		<div
			className="flex flex-col h-full p-4 gap-8 px-48 rtl text-secondary"
		>
			<div
				className="w-full"
			>
				<div
					className="rtl border-b border-primary mb-1"
				>
					<p
						className="text-xl text-primary mb-1"
					>
						فلترة المحاضرات
					</p>
				</div>
				<div
					className="h-20 flex flex-row items-center bg-secondary-100 p-4 gap-2 rounded-b-lg"
				>
					<div
						className="flex flex-row items-center flex-grow gap-2"
					>
						<p
							className="text-xl font-bold"
						>
							فرز
						</p>
						<div
							className="h-full relative"
							onFocus={() => {
								setToggleDisplayMenu(true);
							}}
							onBlur={(e) => {
								if (!e.currentTarget.contains(e.relatedTarget as Node)){
									setToggleDisplayMenu(false)
								}
							}}
						>
							<button
								className={classNames("p-4 w-full text-lg bg-secondary-200 font-semibold rounded-t-lg", {"rounded-lg": !toggleDisplayMenu!})}
							>
								{`حسب ال${displays[display][0]}`}
							</button>

							{toggleDisplayMenu && <div
								className="absolute bg-primary w-full grid grid-cols-1 gap-2 p-2 justify-center shadow-xl z-10 rounded-b-lg overflow-hidden"
							>
								{displays.map((entry, index) => {
									return (
										<button
											className="h-10 w-full bg-primary-100 rounded-sm font-semibold"
											onClick={() => {
												setDisplay(index)
												setToggleDisplayMenu(false)
											}}
										>
											{entry[0]}
										</button>
									)
								})}
								
							</div>}
						</div>
					</div>
					<div
						className="flex flex-row items-center gap-2"
					>
						<p
							className="text-xl font-bold"
						>
							عرض
						</p>
						<div
							className="flex-initial flex items-center gap-1 bg-secondary-200 p-4 rounded-lg"
						>
							<button
								className="bg-secondary-200 h-6 w-6 border-2 border-secondary flex items-center"
								onClick={() => {
									if(lectureType === 0) {
										setLectureType(2)
									} else if (lectureType === 2) {
										setLectureType(0)
									}
								}}
							>
								{lectureType !== 2 && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>}
							</button>
							<p
								className="text-lg font-semibold"
							>
								محاضرات
							</p>
							<button
								className="bg-secondary-200 h-6 w-6 border-2 border-secondary flex items-center"
								onClick={() => {
									if (lectureType === 0){
										setLectureType(1);
									} else if (lectureType === 1) {
										setLectureType(0);
									}
								}}
							>
								{lectureType !== 1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>}
							</button>
							<p
								className="text-lg font-semibold"
							>
								سكاشن
							</p>
						</div>
					</div>
				</div>
					
				{/* <TagSearch 
					tags={tags}
					setTags={setTags}
					courseCode={params.course}
				/> */}
			</div>
			<div
				className="flex-grow"
			>
				<div
					className="rtl border-b border-primary mb-1"
				>
					<p
						className="text-xl text-primary mb-1"
					>
						النتائج
					</p>
				</div>
				<LectureList display={displays[display][1]} lectureType={lectureTypes[lectureType]}/>
			</div>
		</div>
	)
}

export default LectureListingPage;