import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useParams } from "react-router-dom";

import { GetLectures } from "./__generated__/GetLectures";
import LectureListItem from "./lecture-list-item";
import { GetSyllabusTags } from "./__generated__/GetSyllabusTags";
 
interface Props {
	display?: string;
	lectureType?: string | null;
}

const GET_LECTURES = gql`
	query GetLectures($courseCode: String, $first: Int, $after: String, $lectureType: String){
		lectures(course_Code: $courseCode, first: $first, after: $after, lectureType: $lectureType) {
			edges {
				node {
					id
					title 
					body 
					lectureType 
					created
					questionCount
					summaryCount
					resourceCount
					tagSet(course_Code: $courseCode) {
						edges {
							node {
								title
								body
								tagType
							}
						}
					}
					teachers {
						edges {
							node {
								title
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
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
`;

const GET_TAGS = gql`
	query GetTags($title: String, $courseCode: String, $tagType: String) {
		tags(title:$title, course_Code: $courseCode, tagType: $tagType) {
			edges {
				node {
					title
					body
				}
			}
		}
	}
`;

const LectureList: React.FC<Props> = ({ display, lectureType }) => {
	
	let location = useLocation()
	const [ sort, setSort ] = useState(queryString.parse(location.search).sort || display); 
	const FIRST = 30;
	const courseCode = useParams<{course: string}>().course
	const [getLectures, { loading, error, data }] = useLazyQuery<GetLectures>(GET_LECTURES, {
		variables: {
			first: FIRST,
			courseCode: courseCode,
			lectureType: lectureType
		}
	});
	const [getTags, {loading: tagsLoading, error: tagsError, data: tagsData}] = useLazyQuery<GetSyllabusTags>(GET_TAGS, {
		variables: {
			courseCode: courseCode,
			tagType: display
		}
	})

	const toggleSort = (): void => {
		if (sort === "CHAPTER") {
			setSort("SYLLABUS")
			getTags({
				variables: {
					tagType: "SYLLABUS" 
				}
			});
		} else if (sort === "SYLLABUS") {
			setSort("CHAPTER");
			getTags({
				variables: {
					tagType: "CHAPTER" 
				}
			});
		}
	}

	useEffect(() => {
		getLectures();
		getTags();
	}, [])

	return (
		<div
			className="grid grid-cols-1 gap-4 text-secondary"
		>
			{tagsData?.tags?.edges.map(tagEdge => {
				const filtered_lectures = data?.lectures?.edges.filter(lectureEdge => 
					lectureEdge?.node?.tagSet?.edges.filter(lectureTagsEdge => 
						// Filter lectures based on tag title match
						lectureTagsEdge?.node?.title === tagEdge?.node?.title).length! > 0
					)
				return (
					<div
						className="h-full w-full text-secondary"
					>		
						<div
							className="grid grid-cols-1 gap-2"
						>
							<p
								className="font-bold text-primary text-2xl"
							>
								{tagEdge?.node?.title}
							</p>
							<div
								className="border-r pr-2 border-primary grid grid-cols-1 gap-2"
							>
								{filtered_lectures?.map(edge => {
									return (
										edge && <div
											// className="bg-secondary-100"
										>
											<LectureListItem lecture={edge} />
										</div> 

									)
								})}
							</div>

							{/* {data?.summaries?.pageInfo.hasNextPage ? <button
								className="h-20 w-full bg-primary rounded-sm font-semid text-3xl"
								onClick={() => {
									fetchMore!({
										variables: {
											after: data?.summaries?.pageInfo.endCursor
										}
									})
								}}
							>
								المزيد
							</button> : 
							<button
								className="h-20 w-full bg-primary rounded-sm font-semid text-3xl opacity-50 cursor-not-allowed"
							>
								المزيد
							</button>
							} */}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default LectureList;