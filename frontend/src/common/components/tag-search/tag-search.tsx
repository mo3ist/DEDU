import React, { useState } from "react"
import { gql, useQuery } from '@apollo/client';

import { SearchTags } from './__generated__/SearchTags'

interface Props {
	// tagList: Array<String | null>;
	// setTagList: Function;
	onSearch: (tags: String) => void;
}

const SEARCH_TAGS = gql`
	query SearchTags($title: String!){
		tags(title: $title, first: 10){
			edges {
				node {
					title
				}
			}
		}
	}
` 

const TagSearch: React.FC<Props> = ({  onSearch }) => {

	const [tag, setTag] = useState("");
	const [tagList, setTagList] = useState<Array<String | null>>([])

	const { loading, error, data } = useQuery<SearchTags>(SEARCH_TAGS, {
		variables: {
			title: tag
		}
	});

	return (
		<div>
			<input 
				className="border-2 border-black"
				onChange={(e) => {
					setTag(e.target.value);
				}} 
			/>
			<p>{tag}</p>
			<pre className="grid grid-cols-1">
				{data?.tags?.edges.map(edge => {
					return (
						<button
							className="border-2"
							onClick={() => {
								if (tagList.indexOf(edge?.node?.title!) === -1){
									setTagList(tagList?.concat(edge?.node?.title!));
								}
							}}
						>{edge?.node?.title}</button>
					)
				})}
			</pre>
			<button
				className="border-4"
				onClick={() => onSearch(tagList.join(','))}
			>
				SEARCH
			</button>
			<pre>
				{JSON.stringify(tagList, null, 2)}
			</pre>
		</div>
	)
}

export default TagSearch;