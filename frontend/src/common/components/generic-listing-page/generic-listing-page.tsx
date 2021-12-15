import { useReactiveVar } from "@apollo/client";
import classNames from "classnames";
import React, { useState } from "react"
import { currentCourseVar } from "../../apollo-client/apollo-client";
import ListHeader from "../list-header/list-header";
import TagSearch from "../tag-search/tag-search";

interface Props {
	children: React.ReactNode;
	tags: string[] | null;
	setTags: React.Dispatch<React.SetStateAction<string[] | null>>;
	ListHeader: {
		creationText: string,
		creationPath: string
	};
}

const GenericListingPage: React.FC<Props> = ({ children, tags, setTags, ListHeader: header }) => {

	const [showFilter, setShowFilter] = useState<boolean>(false)
	
	const currentCourse = useReactiveVar(currentCourseVar)

	return (
		<div
			className="flex flex-col h-full gap-2 main-margin rtl text-secondary"
		>
			<div
				className="w-full"
			>
				<div
					className="w-full h-full flex flex-col gap-2"
				>
					<ListHeader
						showFilter={showFilter}
						setShowFilter={setShowFilter}
						creationText={header.creationText}
						creationPath={`/courses/${currentCourse?.code}/${header.creationPath}/create/`}
					/>
					{/* Conditional rendering on display property instead of mounting because I need the TagSearch initial query */}
					<div
						className={classNames("h-full w-full", {
							"hidden": !showFilter
						})}

					>
						<TagSearch
							tags={tags}
							setTags={setTags}
							courseCode={currentCourse?.code!}
						/>
					</div>
				</div>
			</div>
			<div
				className="flex-grow"
			>
				{children}
			</div>
		</div>
	)
}

export default GenericListingPage;