import React, { useEffect, useState } from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import classname from 'classnames'

import { GetClassifications } from './__generated__/GetClassifications'

import './course-listing.css'
import { currentClassificationVar, currentCourseVar } from '../../common/apollo-client/apollo-client';
import classNames from 'classnames';
import Loading from '../../common/components/loading/loading';

interface Props {

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

export const CourseListing: React.FC<Props> = () => {
	const { loading, error, data } = useQuery<GetClassifications>(GET_CLASSIFICATIONS)
	
	const currentCourse = useReactiveVar(currentCourseVar)
	const currentClassification = useReactiveVar(currentClassificationVar)

	useEffect(() => {
		localStorage.setItem("currentCourse", JSON.stringify(currentCourse))
		localStorage.setItem("currentClassification", JSON.stringify(currentClassification))
	}, [currentCourse, currentClassification])

	return (
		<div
			className="relative flex flex-row rounded-lg md:p-2 rtl bg-primary-100 p-1"
		>
			{loading && 
			<div
				className="h-96"
			>
				<Loading />
			</div>}
			<div
				className={classNames("clsfn-btn-container pl-1 flex flex-col gap-1", {"w-1/2": currentClassification, "w-full": !currentClassification})}
			>
				<p
					className="flex items-center justify-start text-lg md:text-xl font-semibold mb-1 text-secondary"
				>
					اختر الفرقة
				</p>
				{data?.classifications?.edges?.map(edge => {
					return (
						<button
							className={classname("truncate", {
								"clsfn-btn text-secondary border-r-2 border-primary rounded-sm": currentClassification?.id != edge?.node?.id, 
								"clsfn-btn-selected bg-primary": currentClassification?.id === edge?.node?.id
							})}
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
			{/* {currentClassification && <div
				className="flex items-center justify-center"
			>
				<div
					className="border-l-2 border-primary w-full h-4/6"
				>

				</div>
			</div>} */}
			{currentClassification && <div
				className="w-3/6 clsfn-btn-container pr-1 flex flex-col gap-1"
			>
				<p
					className="flex items-center justify-start text-lg md:text-xl font-semibold mb-1 text-secondary"
				>
					اختر الكورس
				</p>
				{data?.classifications?.edges?.filter(edge => edge?.node?.id === currentClassification?.id).map(edge => {
					return edge?.node?.courses?.edges?.map(edge => {
						return (
							<button
								className={classname("truncate", {
									"course-btn border-r-2 border-primary rounded-sm": currentCourse?.id != edge?.node?.id, 
									"course-btn-selected bg-primary": currentCourse?.id === edge?.node?.id
								})}
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
			</div>}
		</div>
	);
};

export default CourseListing;