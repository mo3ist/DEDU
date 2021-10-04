import React, { useState } from "react"

import LectureList from "./lecture-list"

interface Props {

}

const LectureListingPage: React.FC<Props> = () => {

	return (
		<div>
			<h1>{"<LectureListPage />"}</h1>
			<LectureList />
		</div>
	)
}

export default LectureListingPage;