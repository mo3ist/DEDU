import React, { useState } from "react"

import TagSearch from "../../common/components/tag-search/tag-search";
import QnAList from "./qna-list";

interface Props {

}

const QnAListingPage: React.FC<Props> = () => {

	const [tags, setTags] = useState<Array<String> | null>([])

	return (
		<div
			className="flex flex-col h-full p-4 gap-4"
		>
			<div
				className="w-full"
			>
				<TagSearch 
					tags={tags}
					setTags={setTags}
				/>
			</div>
			<div
				className="flex-grow"
			>
				<QnAList tags={tags}/>
			</div>
		</div>
	)
}

export default QnAListingPage;