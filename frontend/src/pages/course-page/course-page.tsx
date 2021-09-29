import React, { useState } from "react"

import { CourseListing } from './course-listing'
import { ContentListing } from './content-listing'
import { CourseOutline } from './course-outline'
import { CourseStatistics } from './course-statistics'

interface Props {

}

export const CoursePage: React.FC<Props> = () => {

	const [activeCourse, setActiveCourse] = useState<string | null>()

	return (
		<div
		className="grid grid-cols-2 gap-3"
		>
			<div>
				{activeCourse && <CourseStatistics />}
			</div>
			<div>
				<CourseListing setActiveCourse={setActiveCourse} />
			</div>
			<div>
				{activeCourse && <ContentListing activeCourse={activeCourse!} />}
			</div>
			<div>
			 	{activeCourse && <CourseOutline />}
			</div>
		</div>
	)
}

export default CoursePage;