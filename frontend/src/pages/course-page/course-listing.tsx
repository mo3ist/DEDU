import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { GetClassifications } from './__generated__/GetClassifications'

interface Props {
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

export const CourseListing: React.FC<Props> = ({ setActiveCourse }) => {
	
	const { loading, error, data } = useQuery<GetClassifications>(GET_CLASSIFICATIONS)
	
	const [activeCls, setActiveCls] = useState<string | null>("FIRST_YEAR_GENERAL")

	return (
		<div
			className="grid grid-cols-2 rtl-grid"
		>
			<div>
				<div
					className="grid grid-cols-1 gap-4"
				>
					{data?.classifications?.edges?.map(edge => {
						return (
							<button
								className="bg-black text-white"
								key={edge?.node?.id}
								onClick={() => setActiveCls(edge?.node?.year.toString()!)}
							>
								{edge?.node?.year}
							</button>
						)
					})}
				</div>
			</div>	
			<div

			>
				{data?.classifications?.edges?.filter(edge => edge?.node?.year === activeCls).map(edge => {
					return (
						<div
							className="grid grid-cols-1 gap-4"
							key={edge?.node?.id}
						>
							{edge?.node?.courses?.edges?.map(edge => {
								return (
									<button
										className="bg-black text-white"
										key={edge?.node?.id}	
										onClick={() => setActiveCourse(edge?.node?.code.toString()!) }
									> 
										{edge?.node?.title} 
									</button>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default CourseListing;