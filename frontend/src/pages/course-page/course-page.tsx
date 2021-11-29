import React, { useEffect, useState } from "react"
import { gql, useQuery, useReactiveVar } from '@apollo/client'

import { CourseListing } from './course-listing'
import { ContentListing } from './content-listing'
import { CourseOutline } from './course-outline'
import { CourseStatistics } from './course-statistics'
import { GetCourseId } from "./__generated__/GetCourseId"
import { currentClassificationVar, currentCourseVar } from "../../common/apollo-client/apollo-client"
import classNames from "classnames"

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

	const currentClassification = useReactiveVar(currentClassificationVar)
	const currentCourse = useReactiveVar(currentCourseVar)

	const { loading, error, data } = useQuery<GetCourseId>(GET_COURSE_ID);

	return (
		<div
			className="mx-8 my-4 md:my-8 flex flex-row flex-wrap md:flex-nowrap h-full gap-4 md:gap-8 text-secondary"
		>
			<div
				className={classNames("order-2 flex flex-col flex-grow gap-4 md:gap-8", {
						"w-2/3": currentCourse,
						"w-0": !currentCourse
					})}
			>
				{currentCourse?.id && <div
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
					<CourseStatistics />
				</div>}

				{currentCourse?.id && <div
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
					<ContentListing />
				</div>}
			</div>

			<div
				className={classNames("order-1 flex flex-col flex-grow gap-4 md:gap-8", {
					"w-1/3": currentCourse,
					"w-full": !currentCourse
				})}
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
					<CourseListing />
				</div>
				
				{currentCourse?.id && <div
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
					<CourseOutline />
				</div>}
			</div>
		</div>
	)
}

export default CoursePage;