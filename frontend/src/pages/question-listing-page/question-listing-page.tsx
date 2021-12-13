import React, { useState } from "react"
import GenericListingPage from "../../common/components/generic-listing-page/generic-listing-page";
import QuestionList from "./question-list";


interface Props {

}

const ResourceListingPage: React.FC<Props> = () => {

	const [tags, setTags] = useState<string[] | null>([])
	
	return (
		<div
			className="w-full h-full"
		>
			<GenericListingPage 
				tags={tags}
				setTags={setTags}
				ListHeader={{
					creationPath: "question",
					creationText: "مشاركة سؤال"
				}}
			>
				<QuestionList tags={tags} />
			</GenericListingPage>
		</div>
	)
}

export default ResourceListingPage;