import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { GetLectures } from "./__generated__/GetLectures";
import LectureListItem from "./lecture-list-item";
import { GetSyllabusTags } from "./__generated__/GetSyllabusTags";
 
interface Props {

}

const GET_LECTURES = gql`
	query GetLectures($tag_Title: String){
		lectures(tag_Title: $tag_Title) {
			edges {
				node {
					title 
					body 
					lectureType 
					tagSet {
						edges {
							node {
								title
								body
								tagType
							}
						}
					}
					attachmentSet {
						edges {
							node {
								title
								attmType 
							}
						}
					}
				}
			}
		}
	}
`;

const GET_SYLLABUS_TAGS = gql`
	query GetSyllabusTags($title: String) {
		tags(title:$title, tagType: "SYLLABUS") {
			edges {
				node {
					title
					body
				}
			}
		}
	}
`;

const LectureList: React.FC<Props> = () => {
	
	let location = useLocation()
	const [ sort, setSort ] = useState(queryString.parse(location.search).sort || "Week"); 
	const [getLectures, { loading, error, data }] = useLazyQuery<GetLectures>(GET_LECTURES, {
		variables: {
			tag_Title: sort
		}
	});
	const [getTags, {loading: tagsLoading, error: tagsError, data: tagsData}] = useLazyQuery<GetSyllabusTags>(GET_SYLLABUS_TAGS, {
		variables: {
			title: sort
		}
	})

	const toggleSort = (): void => {
		setSort(sort === "Chapter" ? "Week" : "Chapter");
	}

	useEffect(() => {
		getLectures();
		getTags();
	}, [])

	return (
		<div
			className="grid grid-cols-1 gap-3"
		>
			<button
				onClick={() => {
						toggleSort(); 
						getLectures();
						getTags();
					}
				}
			>
				{sort}
			</button>
			{tagsData?.tags?.edges.map(tagEdge => {
				const filtered_lectures = data?.lectures?.edges.filter(lectureEdge => 
					lectureEdge?.node?.tagSet?.edges.filter(lectureTagsEdge => 
						// Filter lectures based on tag title match
						lectureTagsEdge?.node?.title === tagEdge?.node?.title).length! > 0
					)
				return (
					<div>
						<p>
							{tagEdge?.node?.title}
						</p>
						{filtered_lectures?.map(lecture => {
							// Filtered lectures
							return (
								<p>
									<LectureListItem lecture={lecture} />
								</p>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}

export default LectureList;