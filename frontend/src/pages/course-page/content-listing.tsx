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
			className="grid grid-cols-2 gap-2 rtl-grid"
		>
			{contents.map(content => {
				return (
					<button
						className="bg-black text-white"
						key={content.title}
					>
						<Link to={content.url}>
							{content.title}
						</Link>
					</button>
				)
			})}
		</div>
	)
}

export default ContentListing;