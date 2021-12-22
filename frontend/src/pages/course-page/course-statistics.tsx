import React from "react"
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { GetCourseTrivia } from "./__generated__/GetCourseTrivia";
import { currentCourseVar } from "../../common/apollo-client/apollo-client";
import Loading from "../../common/components/loading/loading";

interface Props {

}

const GET_COURSE_TRIVIA = gql`
	query GetCourseTrivia($id: ID) {
		courses(id: $id) {
			edges {
				node {
					id
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
								id
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

export const CourseStatistics: React.FC<Props> = () => {

	const currentCourse = useReactiveVar(currentCourseVar)

	const { loading, error, data } = useQuery<GetCourseTrivia>(GET_COURSE_TRIVIA, {
		variables: {
			id: currentCourse?.id
		}
	})

	const course = data?.courses?.edges[0]?.node

	return (
		<div
			className="relative bg-secondary-100 flex flex-row items-center justify-center gap-4 rtl p-4 rounded-lg"
		>
			{loading && <Loading />}
			{/* data */}
			<div
				className="w-3/4 h-full flex flex-col items-center justify-center"
			>
				{/* logo, title, and teachers */}
				<div
					className="flex-grow w-full flex flex-row gap-4 h-2/4"
				>
					<div
						className="flex items-center justify-center"
					>
						<div
							className="bg-primary rounded-full p-1 h-14 w-14 md:h-24 md:w-24"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-full inline md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path d="M12 14l9-5-9-5-9 5 9 5z" />
								<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
							</svg>
						</div>
					</div>
					
					<div
						className="flex flex-col flex-grow gap-1"						
					>
						<div
							className="flex-grow flex items-center"
						>
							<p
								className="text-2xl md:text-3xl font-bold"
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
						className="text-primary text-2xl md:text-4xl font-bold"
					>
						{course?.contribs}
					</p>
					<p
						className="text-secondary text-xl md:text-3xl"
					>
						مشاركة
					</p>

					<p className="mt-3 mb-3">
						من
					</p>

					<p
						className="text-primary text-2xl md:text-4xl font-bold"
					>
						{course?.contribsUsers}
					</p>
					
					<p
						className="text-secondary text-xl md:text-3xl"
					>
						مساهم
					</p>
				</div>
			</div>

		</div>
	)
}

export default CourseStatistics;