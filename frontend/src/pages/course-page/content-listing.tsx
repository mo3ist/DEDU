import React from "react"
import { Link } from 'react-router-dom'


interface Content {
	title: string;
	url: string
}

type Contents = Content[];

interface Props {
	activeCourse: string;
}

export const ContentListing: React.FC<Props> = ({ activeCourse }) => {

	const baseUrl = `/courses/${activeCourse}`;
	const contents: Contents = [
		{
			title: "Lectures",
			url: `${baseUrl}/lectures/`
		}, {
			title: "Summaries",
			url: `${baseUrl}/summaries/`
		},
		{
			title: "Q&A",
			url: `${baseUrl}/qnas/`
		}, {
			title: "Quizzes",
			url: `${baseUrl}/quizzes/`
		},
		{
			title: "Resources",
			url: `${baseUrl}/resources/`
		}
	];

	return (
		<div
			className="grid grid-cols-2 gap-8 rtl-grid h-full"
		>
			{contents.map(content => {
				return (
					<Link to={content.url}>
						<button
							className="bg-primary text-secondary text-2xl w-full h-full"
							key={content.title}
						>
								{content.title}
						</button>
					</Link>
				)
			})}
		</div>
	)
}

export default ContentListing;