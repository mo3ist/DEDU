import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import classname from 'classnames'

import { GetClassifications } from './__generated__/GetClassifications'

import './course-listing.css'

interface Props {
	activeCourse: String | null;
	setActiveCourse: (course: string | null) => void; 
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

export const CourseListing: React.FC<Props> = ({ activeCourse, setActiveCourse }) => {
	
	const { loading, error, data } = useQuery<GetClassifications>(GET_CLASSIFICATIONS)
	
	const [activeCls, setActiveCls] = useState<string | null>("FIRST_YEAR_GENERAL")

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
							className={classname({"clsfn-btn": activeCls != edge?.node?.year, "clsfn-btn-selected": activeCls === edge?.node?.year})}
							key={edge?.node?.id}
							onClick={() => setActiveCls(edge?.node?.year.toString()!)}
						>
							{edge?.node?.year}
						</button>
					)
				})}
			</div>	
			<div
				className="border-r-4 border-secondary-light w-3/6 clsfn-btn-container"
			>
				{data?.classifications?.edges?.filter(edge => edge?.node?.year === activeCls).map(edge => {
					return edge?.node?.courses?.edges?.map(edge => {
						return (
							<button
							className={classname({"course-btn": activeCourse != edge?.node?.code, "course-btn-selected": activeCourse === edge?.node?.code})}
								key={edge?.node?.id}	
								onClick={() => setActiveCourse(edge?.node?.code.toString()!) }
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