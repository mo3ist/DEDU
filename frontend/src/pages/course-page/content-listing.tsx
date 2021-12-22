import React from "react"
import { Link } from 'react-router-dom'
import { gql, useQuery, useReactiveVar } from '@apollo/client'

import { GetCourseCode } from "./__generated__/GetCourseCode";
import { GetContentCount } from "./__generated__/GetContentCount";
import { currentCourseVar } from "../../common/apollo-client/apollo-client";
import Loading from "../../common/components/loading/loading";

interface Content {
	title: string;
	type: string;
	url: string
}

type Contents = Content[];

interface Props {

}

const GET_COURSE_CODE = gql`
	query GetCourseCode($id: ID) {
		courses (id: $id) {
			edges {
				node {
					id
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

export const ContentListing: React.FC<Props> = () => {

	const currentCourse = useReactiveVar(currentCourseVar)

	const { loading: codeLoading, error: codeError, data: codeData } = useQuery<GetCourseCode>(GET_COURSE_CODE, {
		variables: {
			id: currentCourse?.id
		},
		// fetchPolicy: 'cache-only'	// from the cached course-listing query 
	})

	const { loading: countLoading, error: countError, data: countData } = useQuery<GetContentCount>(GET_CONTENT_COUNT, {
		variables: {
			id: currentCourse?.id
		},
	})

	const baseUrl = `/courses/${codeData?.courses?.edges[0]?.node?.code}`;
	const contents: Contents = [
		{
			title: "محاضرات",
			type: 'lecture',
			url: `${baseUrl}/lecture/`
		}, {
			title: "ملخصات",
			type: 'summary',
			url: `${baseUrl}/summary/`
		},
		{
			title: "س&ج",
			type: 'question',
			url: `${baseUrl}/question/`
		}, {
			title: "تدريبات",
			type: 'quiz',
			url: `${baseUrl}/quiz/`
		},
		{
			title: "مصادر",
			type: 'resource',
			url: `${baseUrl}/resource/`
		}
	];

	return (
		<div
			className="relative grid grid-cols-2 gap-4 md:gap-8 h-full rtl"
		>
			{(codeLoading || countLoading) && <Loading />}
			{contents.map(content => {
				return (
					<div
						className="h-32 md:h-48 bg-primary p-4 rounded-lg"
					>
						<Link to={content.url}>
						<div
							className="flex flex-col items-center justfiy-center h-full"
						>
							<button
								className=" text-secondary text-xl md:text-2xl flex-grow font-bold"
								key={content.title}
							>
								{content.title}
							</button>
							
							<div
								className="w-full flex-initial flex items-start justify-start gap-1"
							>
								<p
									className="text-secondary-100 font-bold"
									key={content.title}
								>
									{content.type === 'lecture' && countData?.courses?.edges[0]?.node?.lecturesCount}
									{content.type === 'question' && countData?.courses?.edges[0]?.node?.questionsCount}
									{content.type === 'quiz' && countData?.courses?.edges[0]?.node?.quizzesCount}
									{content.type === 'summary' && countData?.courses?.edges[0]?.node?.summariesCount}
									{content.type === 'resource' && countData?.courses?.edges[0]?.node?.resourcesCount}
								</p>
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