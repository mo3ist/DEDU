import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import classname from 'classnames'

import { GetClassifications } from './__generated__/GetClassifications'

import './course-listing.css'

interface Props {
	activeCourseId: String | null;
	setActiveCourseId: (course: string | null) => void; 
	activeClsfnId: string | null;
	setActiveClsfnId: (clsfn: string | null) => void
};

const GET_CLASSIFICATIONS = gql`
	query GetClassifications {
		classifications{
			edges {
				node {
					id
					year
					courses {
						edges {
							node {
								id
								title
								code
							}
						}
					}
				}
			}
		}
	}
`

export const CourseListing: React.FC<Props> = ({ activeCourseId, setActiveCourseId, activeClsfnId, setActiveClsfnId }) => {
	
	const { loading, error, data } = useQuery<GetClassifications>(GET_CLASSIFICATIONS)
	
	useEffect(() => {
		console.log(activeCourseId, data)
	})

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
							className={classname({"clsfn-btn": activeClsfnId != edge?.node?.id, "clsfn-btn-selected": activeClsfnId === edge?.node?.id})}
							key={edge?.node?.id}
							onClick={() => setActiveClsfnId(edge?.node?.id.toString()!)}
						>
							{edge?.node?.year}
						</button>
					)
				})}
			</div>	
			<div
				className="border-r-4 border-secondary-100 w-3/6 clsfn-btn-container"
			>
				{data?.classifications?.edges?.filter(edge => edge?.node?.id === activeClsfnId).map(edge => {
					return edge?.node?.courses?.edges?.map(edge => {
						return (
							<button
							className={classname({"course-btn": activeCourseId != edge?.node?.id, "course-btn-selected": activeCourseId === edge?.node?.id})}
								key={edge?.node?.id}	
								onClick={() => setActiveCourseId(edge?.node?.id.toString()!) }
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