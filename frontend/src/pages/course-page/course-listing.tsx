import React, { useEffect, useState } from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import classname from 'classnames'

import { GetClassifications } from './__generated__/GetClassifications'

import './course-listing.css'
import { currentClassificationVar, currentCourseVar } from '../../common/apollo-client/apollo-client';

interface Props {
	setActiveCourseId: (course: string | null) => void; 
	setActiveClsfnId: (clsfn: string | null) => void
};

const GET_CLASSIFICATIONS = gql`
	query GetClassifications {
		classifications{
			edges {
				node {
					id
					code
					title
					courses {
						edges {
							node {
								id
								title
								code
							}
						}
						currentCourse @client {
							id
							code
							title
						}
					}
				}
			}
			currentClassification @client {
				id
				code
				title
			}
		}
	}
`

export const CourseListing: React.FC<Props> = ({ setActiveClsfnId, setActiveCourseId }) => {
	
	const { loading, error, data } = useQuery<GetClassifications>(GET_CLASSIFICATIONS)
	
	const currentCourse = useReactiveVar(currentCourseVar)
	const currentClassification = useReactiveVar(currentClassificationVar)

	useEffect(() => {
		setActiveClsfnId(currentClassification?.id!)
		setActiveCourseId(currentCourse?.id!)
		localStorage.setItem("currentCourse", JSON.stringify(currentCourse))
		localStorage.setItem("currentClassification", JSON.stringify(currentClassification))
	}, [currentCourse, currentClassification])

	return (
		<div
			className="flex flex-row-reverse"
		>
			<div
				className="clsfn-btn-container"
			>
				{data?.classifications?.edges?.map(edge => {
					return (
						<button
							className={classname({"clsfn-btn": currentClassification?.id != edge?.node?.id, "clsfn-btn-selected": currentClassification?.id === edge?.node?.id})}
							key={edge?.node?.id}
							onClick={() => {
								currentClassificationVar({
									id: edge?.node?.id.toString()!,
									code: edge?.node?.code!,
									title: edge?.node?.title!
								})
							}}
						>
							{edge?.node?.title}
						</button>
					)
				})}
			</div>	
			<div
				className="border-r-4 border-secondary-100 w-3/6 clsfn-btn-container"
			>
				{data?.classifications?.edges?.filter(edge => edge?.node?.id === currentClassification?.id).map(edge => {
					return edge?.node?.courses?.edges?.map(edge => {
						return (
							<button
							className={classname({"course-btn": currentCourse?.id != edge?.node?.id, "course-btn-selected": currentCourse?.id === edge?.node?.id})}
								key={edge?.node?.id}	
								onClick={() => {
									currentCourseVar({
										id: edge?.node?.id.toString()!,
										code: edge?.node?.code!,
										title: edge?.node?.title!
									})
								}}
							> 
								{edge?.node?.title} 
							</button>
						)
					})
				})}
			</div>
		</div>
	);
};

export default CourseListing;