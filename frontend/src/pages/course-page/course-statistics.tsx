import React from "react"
import { gql, useQuery } from '@apollo/client';
import { GetCourseTrivia } from "./__generated__/GetCourseTrivia";

interface Props {
	activeCourseId: String | null;
}

const GET_COURSE_TRIVIA = gql`
	query GetCourseTrivia($id: ID) {
		courses(id: $id) {
			edges {
				node {
					title 
					description
					attachmentSet {
						edges {
							node {
								file 
							}
						}
					}
					contribs
					contribsUsers 
					teachers {
						edges {
							node {
								title
								teacherType
							}
						} 
					}
				}
			}
		}
	}
`;

export const CourseStatistics: React.FC<Props> = ({ activeCourseId }) => {

	const { loading, error, data } = useQuery<GetCourseTrivia>(GET_COURSE_TRIVIA, {
		variables: {
			id: activeCourseId
		}
	})

	const course = data?.courses?.edges[0]?.node

	return (
		<div
			className="bg-secondary-light h-64 flex flex-row items-center justify-center gap-4 rtl p-4"
		>
			{/* data */}
			<div
				className="w-3/4 h-full flex flex-col items-center justify-center"
			>
				{/* logo, title, and teachers */}
				<div
					className="flex-grow w-full gap-4 flex flex-row gap-4 h-2/4"
				>
					<div
						className="flex items-center justify-center"
					>
						<div
							className="bg-primary rounded-full p-1"
						>
							<img src={course?.attachmentSet?.edges[0]?.node?.file!} alt="" className="object-contain rounded-full w-20 h-20"/>
						</div>
					</div>
					
					<div
						className="flex flex-col flex-grow gap-1"						
					>
						<div
							className="flex-grow flex items-center"
						>
							<p
								className="text-3xl font-bold"
							>
								{course?.title}
							</p>
						</div>
						<div
							className="flex-grow flex items-center gap-3"
						>
							{course?.teachers?.edges.map(edge => {
								return (
									<p
										className="inline-block text-sm"
									>
										{edge?.node?.title}
									</p>
								)
							})}
						</div>
					</div>
				</div>

				{/* description */}
				<div
					className="flex-grow h-2/4"
				>
					{course?.description}
				</div>
			</div>

			{/* contribs */}
			<div
				className="w-1/4 h-full flex flex-col items-center justify-center gap-4"
			>
				{/* no. contribs */}
				<div
					className="flex-grow w-full flex flex-col justify-center"
				>
					<p
						className="text-primary text-4xl font-bold"
					>
						{course?.contribs}
					</p>
					<p
						className="text-secondary text-3xl"
					>
						مشاركة
					</p>

					<p className="mt-3 mb-3">
						من
					</p>

					<p
						className="text-primary text-4xl font-bold"
					>
						{course?.contribsUsers}
					</p>
					
					<p
						className="text-secondary text-3xl"
					>
						مساهم
					</p>
				</div>
			</div>

		</div>
	)
}

export default CourseStatistics;