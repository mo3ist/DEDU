import React, { useEffect, useState } from "react"
import { gql, useQuery } from '@apollo/client'

import { CourseListing } from './course-listing'
import { ContentListing } from './content-listing'
import { CourseOutline } from './course-outline'
import { CourseStatistics } from './course-statistics'
import { GetCourseId } from "./__generated__/GetCourseId"

interface Props {

}

const GET_COURSE_ID = gql`
	query GetCourseId {
		classifications{
			edges {
				node {
					id
					courses {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
	}
`;

export const CoursePage: React.FC<Props> = () => {

	const { loading, error, data } = useQuery<GetCourseId>(GET_COURSE_ID, {
		onCompleted: (data) => {
			setActiveClsfnId(data.classifications?.edges[1]?.node?.id!)
			setActiveCourseId(data.classifications?.edges[1]?.node?.courses?.edges[1]?.node?.id!)
		}
	});

	const [activeClsfnId, setActiveClsfnId] = useState<string | null>("");
	const [activeCourseId, setActiveCourseId] = useState<string | null>("");

	return (
		<div
			className="flex flex-row h-full gap-8 text-secondary"
		>
			<div
				className="flex flex-col flex-grow w-2/3 gap-8"
			>
				<div
					className="flex-initial"
				>
					<div
						className="rtl border-b border-primary mb-1"
					>
						<p
							className="text-xl text-primary mb-1"
						>
							موجز
						</p>
					</div>
					{activeCourseId && <CourseStatistics activeCourseId={activeCourseId}/>}
				</div>

				<div
					className="flex-grow flex flex-col h-full"
				>
					<div
						className="rtl border-b border-primary mb-1"
					>
						<p
							className="text-xl text-primary mb-1"
						>
							المحتويات
						</p>
					</div>
					{activeCourseId && <ContentListing activeCourseId={activeCourseId!} />}
				</div>
			</div>

			<div
				className="flex flex-col flex-grow gap-8 w-1/3"
			>
				<div
					className="flex-initial"
				>
					<div
						className="rtl border-b border-primary mb-1"
					>
						<p
							className="text-xl text-primary mb-1"
						>
							الكورسات
						</p>
					</div>
					<CourseListing activeCourseId={activeCourseId} setActiveCourseId={setActiveCourseId} activeClsfnId={activeClsfnId} setActiveClsfnId={setActiveClsfnId}/>
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
							فهرس
						</p>
					</div>
					{activeCourseId && <CourseOutline activeCourseId={activeCourseId} />}
				</div>
			</div>
		</div>
	)
}

export default CoursePage;