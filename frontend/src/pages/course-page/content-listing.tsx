import React from "react"
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { GetCourseCode } from "./__generated__/GetCourseCode";
import { GetContentCount } from "./__generated__/GetContentCount";

interface Content {
	title: string;
	type: string;
	url: string
}

type Contents = Content[];

interface Props {
	activeCourseId: string;
}

const GET_COURSE_CODE = gql`
	query GetCourseCode($id: ID) {
		courses (id: $id) {
			edges {
				node {
					code
				}
			}
		}
	}
`;

const GET_CONTENT_COUNT = gql`
	query GetContentCount($id: ID) {
		courses(id: $id) {
			edges {
				node {
                    lecturesCount
                    questionsCount
                    answersCount
                    quizzesCount
                    resourcesCount
                    summariesCount
                }
			}
		}
	}
`;

export const ContentListing: React.FC<Props> = ({ activeCourseId: activeCourseId }) => {

	const { loading: codeLoading, error: codeError, data: codeData } = useQuery<GetCourseCode>(GET_COURSE_CODE, {
		variables: {
			id: activeCourseId
		},
		// fetchPolicy: 'cache-only'	// from the cached course-listing query 
	})

	const { loading: countLoading, error: countError, data: countData } = useQuery<GetContentCount>(GET_CONTENT_COUNT, {
		variables: {
			id: activeCourseId
		},
	})

	const baseUrl = `/courses/${codeData?.courses?.edges[0]?.node?.code}`;
	const contents: Contents = [
		{
			title: "محاضرات",
			type: 'lecture',
			url: `${baseUrl}/lectures/`
		}, {
			title: "ملخصات",
			type: 'summary',
			url: `${baseUrl}/summaries/`
		},
		{
			title: "س&ج",
			type: 'question',
			url: `${baseUrl}/qnas/`
		}, {
			title: "تدريبات",
			type: 'quiz',
			url: `${baseUrl}/quizzes/`
		},
		{
			title: "مصادر",
			type: 'resource',
			url: `${baseUrl}/resources/`
		}
	];

	return (
		<div
			className="grid grid-cols-2 gap-8 rtl-grid h-full "
		>
			{contents.map(content => {
				return (
					<div
						className="h-full bg-primary p-4"
					>
						<Link to={content.url}>
						<div
							className="flex flex-col items-center justfiy-center h-full"
						>
							<button
								className=" text-secondary text-2xl flex-grow font-bold"
								key={content.title}
							>
								{content.title}
							</button>
							
							<div
								className="w-full flex-initial flex items-end justify-end gap-2"
							>
								<p
									className="text-secondary"
									key={content.title}
								>
									{content.type === 'lecture' && 'محاضرة'}
									{content.type === 'question' && 'سؤال'}
									{content.type === 'quiz' && 'تدريب'}
									{content.type === 'summary' && 'ملخص'}
									{content.type === 'resource' && 'مصدر'}
								</p>

								<p
									className="text-secondary"
									key={content.title}
								>
									{content.type === 'lecture' && countData?.courses?.edges[0]?.node?.lecturesCount}
									{content.type === 'question' && countData?.courses?.edges[0]?.node?.questionsCount}
									{content.type === 'quiz' && countData?.courses?.edges[0]?.node?.quizzesCount}
									{content.type === 'summary' && countData?.courses?.edges[0]?.node?.summariesCount}
									{content.type === 'resource' && countData?.courses?.edges[0]?.node?.resourcesCount}
								</p>
							</div>
						</div>
						</Link>

					</div>
				)
			})}
		</div>
	)
}

export default ContentListing;