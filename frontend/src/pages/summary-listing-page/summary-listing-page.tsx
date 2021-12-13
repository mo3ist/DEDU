import React, { useState } from "react"
import GenericListingPage from "../../common/components/generic-listing-page/generic-listing-page";

import SummaryList from "./summary-list";

interface Props {

}

const SummaryListingPage: React.FC<Props> = () => {

	const [tags, setTags] = useState<string[] | null>([])
	
	return (
		<div
			className="w-full h-full"
		>
			<GenericListingPage 
				tags={tags}
				setTags={setTags}
				ListHeader={{
					creationPath: "summary",
					creationText: "مشاركة ملخص"
				}}
			>
				<SummaryList tags={tags} />
			</GenericListingPage>
		</div>
	)
}

export default SummaryListingPage;