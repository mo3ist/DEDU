import React, { useState } from "react"
import { useParams } from 'react-router-dom'

import TagSearch from "../../common/components/tag-search/tag-search";
import QnAList from "./qna-list";

interface Props {

}

const QnAListingPage: React.FC<Props> = () => {

	const [tags, setTags] = useState<Array<String> | null>([])
	const params = useParams<{course: string}>()

	return (
		<div
			className="flex flex-col h-full p-4 gap-2 px-48"
		>
			<div
				className="w-full"
			>
				<div
					className="rtl border-b border-primary mb-1"
				>
					<p
						className="text-xl text-primary mb-1"
					>
						فلترة الأسئلة
					</p>
				</div>
				<TagSearch 
					tags={tags}
					setTags={setTags}
					courseCode={params.course}
				/>
			</div>
			<div
				className="flex-grow"
			>
				<div
					className="rtl border-b border-primary mb-1"
				>
					<p
						className="text-xl text-primary mb-1"
					>
						النتائج
					</p>
				</div>
				<QnAList tags={tags}/>
			</div>
		</div>
	)
}

export default QnAListingPage;