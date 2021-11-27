import React, { useState } from "react"
import { useParams } from 'react-router-dom'

import TagSearch from "../../common/components/tag-search/tag-search";
import ResourceList from "./resource-list";

interface Props {

}

const ResourceListingPage: React.FC<Props> = () => {

	const [tags, setTags] = useState<Array<String> | null>([])
	const params = useParams<{course: string}>()

	return (
		<div
			className="flex flex-col h-full gap-2 main-margin"
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
						فلترة المصادر
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
				<ResourceList tags={tags}/>
			</div>
		</div>
	)
}

export default ResourceListingPage;