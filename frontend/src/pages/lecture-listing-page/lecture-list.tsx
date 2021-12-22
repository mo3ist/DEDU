import React, { useState, useEffect } from "react";
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useParams } from "react-router-dom";

import { GetLectures } from "./__generated__/GetLectures";
import LectureListItem from "./lecture-list-item";
import { GetSyllabusTags } from "./__generated__/GetSyllabusTags";
import Loading from "../../common/components/loading/loading";
 
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
			className="relative grid grid-cols-1 gap-4"
		>
			{(loading || tagsLoading) && <div
				className="h-96"
			>
				<Loading />
			</div>}
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
								className="font-semibold text-secondary-100 text-2xl md:text-3xl"
							>
								{tagEdge?.node?.title}
							</p>
							<div
								className="border-r pr-1 border-primary grid grid-cols-1 gap-2"
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
								{filtered_lectures?.length === 0 && <p
									className="flex items-center justify-center font-semibold text-primary text-base md:text-xl"
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
									</svg>
									لاتتوفر نتائج
								</p>}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default LectureList;