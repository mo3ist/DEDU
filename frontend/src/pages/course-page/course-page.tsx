import React, { useState } from "react"

import { CourseListing } from './course-listing'
import { ContentListing } from './content-listing'
import { CourseOutline } from './course-outline'
import { CourseStatistics } from './course-statistics'

interface Props {

}

export const CoursePage: React.FC<Props> = () => {

	const [activeCourse, setActiveCourse] = useState<string | null>("")

	return (
		<div
			className="flex flex-row h-full gap-8"
		>
			<div
				className="flex flex-col flex-grow w-2/3 gap-8"
			>
				<div
					className="bg-secondary-light flex-initial"
				>
					{activeCourse && <CourseStatistics />}
				</div>

				<div
					className="flex-grow"
				>
					{activeCourse && <ContentListing activeCourse={activeCourse!} />}
				</div>
			</div>

			<div
				className="flex flex-col flex-grow gap-8 w-1/3"
			>
				<div
					className="flex-initial"
				>
					<CourseListing activeCourse={activeCourse} setActiveCourse={setActiveCourse} />
				</div>
				
				<div
					className="bg-secondary-light flex-grow"
				>
					{activeCourse && <CourseOutline />}
				</div>
			</div>
		</div>
	)
}

export default CoursePage;