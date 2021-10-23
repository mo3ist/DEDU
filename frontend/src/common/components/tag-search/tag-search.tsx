import React, { useRef, useState } from "react"
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import { SearchTags } from './__generated__/SearchTags'

interface Props {
	tags: Array<String> | null;
	setTags : Function;
	courseCode: String;
	creatable?: boolean;	// For tag creation...
}

const SEARCH_TAGS = gql`
	query SearchTags($title: String!, $tagType: String, $first: Int, $after: String, $course_Code: String){
		tags(title: $title, tagType: $tagType , first: $first, after: $after, course_Code: $course_Code){
			edges {
				node {
					title
				}
			},
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
		}
	}
` 

const TagSearch: React.FC<Props> = ({  tags, setTags, courseCode, creatable=false }) => {

	const [tag, setTag] = useState("");
	const [toggleTypesMenu, setToggleTypesMenu] = useState<boolean>(false)
	
	// API THINGIE. CHANGE TO ENUMS LATER
	const types = [
		["محاضرات", "LECTURE"],
		["فصول", "CHAPTER"],
		["مفاهيم", "CONCEPT"]
	]

	const [selectedType, setSelectedType] = useState<number>(0);
	const [toggleSearch, setToggleSearch] = useState<boolean>(false);

	const FIRST = 10;

	const [getSearchTags, { loading, error, data, fetchMore }] = useLazyQuery<SearchTags>(SEARCH_TAGS, {
		variables: {
			title: tag,
			first: FIRST,
			tagType: types[selectedType][1] ,
			course_Code: courseCode
		}
	});

	const inputTag = useRef<HTMLInputElement>(null);
	const divSearch = useRef<HTMLDivElement>(null);


	return (
		<div
			className="flex flex-col h-36 w-full items-center justify-center text-secondary border-2 border-secondary-200"
		>
			{/* Wrapper for design (bg-color) */}
			<div
				className="h-full w-full flex flex-col"
			>
			<div
					className="h-1/3 w-full flex flex-row gap-1 bg-secondary-100"
				>
					<div
						className="w-5/6 h-full relative"

						onFocus={() => {
							setToggleSearch(true);
							getSearchTags()
						}}
						onBlur={(e) => {
							if (!e.currentTarget.contains(e.relatedTarget as Node)){
								setToggleSearch(false)
							}
						}}
					>
						<input 
							className="h-full w-full rtl px-4 bg-secondary-200 text-lg font-semibolهذ"
							placeholder={`البحث حسب ال${types[selectedType][0]}`}
							ref={inputTag}
							value={tag}
							onChange={(e) => {
								setTag(e.target.value);
								getSearchTags({
									variables: {
										title: e.target.value
									}
								})
							}} 
						/>
						{toggleSearch && <div
							className="absolute bg-primary w-full flex flex-col items-center justify-center shadow-xl z-10 h-56"
							
						>
							{/* Wrapper for scroll */}
							<div
								className="h-full w-full overflow-y-scroll"
							>
								<div
									className="w-full grid grid-cols-1 gap-2 p-2"
									ref={divSearch}
									onScroll={() => {
										if (divSearch.current?.scrollHeight! - divSearch.current?.scrollTop! === divSearch.current?.clientHeight!) {
											if (data?.tags?.pageInfo.hasNextPage){
												const nextAfter = data?.tags?.pageInfo?.endCursor!
												fetchMore!({
													variables: {
														after: nextAfter
													}
												});
											}
										}
									}}
								>
									{/* If creatable */}
									{creatable && data?.tags?.edges.length === 0 && tags?.indexOf(tag) === -1 &&
										<button
											className="flex-grow h-10 w-full bg-primary-100 rounded-sm font-semibold"
											onClick={() => {
												setTags(tags!?.concat(tag))
												setTag("")

												// When the item gets removed from the div, its onHover event.currentTag.contains won't work 
												inputTag.current?.focus()
											}}
										>
											<span className="font-bold">{tag}</span>
										</button>
									}

									{/* Filter items in list */}
									{/* {data?.tags?.edges.filter(tag => tags?.indexOf(tag?.node?.title!) === -1).map(edge => { */}
									{data?.tags?.edges.map(edge => {
										return (
											tags?.indexOf(edge?.node?.title!) === -1 ? <button
												className="flex-grow h-10 w-full bg-primary-100 rounded-sm font-semibold"
												onClick={() => {
													setTags(tags!?.concat(edge?.node?.title!))

													// When the item gets removed from the div, its onHover event.currentTag.contains won't work 
													inputTag.current?.focus()
												}}
											>
												{edge?.node?.title}
											</button> :
											<button
												className="h-10 w-full opacity-80 cursor-not-allowed"
											>
												{edge?.node?.title}
											</button>

										)
									})}
								</div>
							</div>
							
						</div>}

					</div>
					<div
						className="w-1/6 h-full relative"
						onFocus={() => {
							setToggleTypesMenu(true);
						}}
						onBlur={(e) => {
							if (!e.currentTarget.contains(e.relatedTarget as Node)){
								setToggleTypesMenu(false)
							}
						}}
					>
						<button
							className="h-full w-full text-xl bg-secondary-200 font-semibold"
						>
							{`حسب ال${types[selectedType][0]}`}
						</button>

						{toggleTypesMenu && <div
							className="absolute bg-primary w-full grid grid-cols-1 gap-2 p-2 justify-center shadow-xl z-10"
						>
							{types.map((entry, index) => {
								return (
									<button
										className="h-10 w-full bg-primary-100 rounded-sm font-semibold"
										onClick={() => {
											setSelectedType(index)
											setToggleTypesMenu(false)
										}}
									>
										{entry[0]}
									</button>
								)
							})}
							
						</div>}

					</div>
				</div>
				<div
					className="h-2/3 w-full relative bg-secondary-100"
				>
					<button
						className="absolute bg-primary-100 w-10 h-10 shadow-md rounded-br-md"
						onClick={() => {
							setTags([])
						}}
					>
						x
					</button>
					<div
						className="flex-grow flex flex-row justify-end gap-4 p-4 flex-wrap overflow-y-scroll h-full"
					>
						{tags?.length === 0 && <p
							className="text-lg opacity-50 h-full w-full text-center"
						>
							قم بتحديد وسم أو أكثر لفلترة النتائج	
						</p>}
						{tags?.map(tag => {
							return (
								<div
									className="flex flex-row h-10 items-center justify-center gap-2 text-secondary bg-primary px-2 py-1 rounded-full"
								>
									<p
										className="inline-block font-semibold"
									>
										{tag}
									</p>
									<button
										className="text-secondary bg-primary-100 w-6 rounded-full"	
										onClick={() => {
											setTags(tags?.filter(item => item !== tag))
										}}
									>
										x
									</button>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			
		</div>
	)
}

export default TagSearch;