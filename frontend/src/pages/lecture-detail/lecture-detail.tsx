import React, { useState } from "react"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router"
import MiniLectureListing from "./mini-lecture-listing"
import { GetDetailedLecture } from "./__generated__/GetDetailedLecture"
import LectureDetailMain from "./lecture-detail-main"
import Concepts from "./concepts"
import QnAList from "../qna-listing-page/qna-list"

interface Props {

}

const GET_DETAILED_LECTURE = gql`
	query GetDetailedLecture($id: ID!, $courseCode: String!){
		lectures(id: $id){
			edges {
				node {
					id
					title
					body
					attachmentSet {
						edges {
							node {
								url
								attmType
							}
						}
					}
					tagSet(course_Code: $courseCode, tagType: "CONCEPT") {
						edges {
							node {
								title
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
				}
			}
		}
	}
` 

const LectureDetail: React.FC<Props> = () => {
	
	const [id, setId] = useState<string | null>(useParams<{id: string}>().id )
	const courseCode = useParams<{course: string}>().course

	const { loading, error, data } = useQuery<GetDetailedLecture>(GET_DETAILED_LECTURE, {
		variables: {
			id: id,
			courseCode: courseCode
		}
	})

	
	return (
		<div
			className="w-full flex flex-col items-center justify-center rtl text-secondary p-8"
		>
			{/* 3 Sections: MiniLectureList, Lecture media, concepts */}
			<div
				className="w-full flex-grow flex flex-row items-start justify-center gap-8"
			>
				<div
					className="w-1/6 h-full"
				>
					<div
						className="rtl border-b border-primary mb-1"
					>
						<p
							className="text-xl text-primary mb-1"
						>
							تنقل
						</p>
					</div>
					<MiniLectureListing 
						id={id}
						setId={setId}
					/>
				</div>
				<div
					className="w-4/6 h-full flex flex-col items-center justify-center gap-8"
				>
					
					<LectureDetailMain lecture={data?.lectures?.edges[0]?.node!}/>

					{data?.lectures?.edges[0]?.node?.tagSet?.edges?.length! > 0 && <div
						className="h-full w-full"
					>
						<div
							className="rtl border-b border-primary mb-1"
						>
							<p
								className="text-xl text-primary mb-1"
							>
								اسئلة على المحاضرة
							</p>
						</div>

						{/* rounded hack */}
						<div
						>
							<QnAList 
								tags={data?.lectures?.edges[0]?.node?.tagSet?.edges.map(edge => edge?.node?.title!) || []}
							/>
						</div>
					</div>}	
				</div>
				<div
					className="w-1/6 h-full"
				>
					<div
						className="rtl border-b border-primary mb-1"
					>
						<p
							className="text-xl text-primary mb-1"
						>
							المفاهيم
						</p>
					</div>
					<Concepts tags={data?.lectures?.edges[0]?.node?.tagSet!}/>
				</div>
			</div>
		</div>
	)
}

export default LectureDetail