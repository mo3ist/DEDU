import React, { useRef, useState } from "react"
import { ApolloError, gql, useApolloClient, useLazyQuery, useQuery } from '@apollo/client';

import { SearchTags } from './__generated__/SearchTags'
import classNames from "classnames";
import Loading from "../loading/loading";

interface Props {
	tags: Array<String> | null;
	setTags : Function;
	courseCode: String;
	creatable?: boolean;	// For tag creation...
}

const SEARCH_TAGS = gql`
	query SearchTags($title: String!, $tagType: String, $first: Int, $after: String, $courseCode: String){
		tags(title: $title, tagType: $tagType , first: $first, after: $after, course_Code: $courseCode){
			edges {
				node {
					id
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

const TagSearch: React.FC<Props> = ({  tags=[], setTags, courseCode, creatable=false }) => {

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
	
	const [submit, setSubmit] = useState<boolean>(false);

	const FIRST = 5;

	const [data, setData] = useState<SearchTags | undefined>()
	const [loading, setLoading] = useState<boolean | undefined>()
	const [error, setError] = useState<ApolloError | undefined>()

	const inputTag = useRef<HTMLInputElement>(null);
	const divSearch = useRef<HTMLDivElement>(null);

	// I went through this mental gymnastics cause useLazyQuery was querying on each rerender
	// aka with every keypress. I had to directly use the client to skip that initial request.
	// NOTE: This method won't update the component on cache update
	const apolloClient = useApolloClient()
	const getSearchTags = async ({
			title=tag,
			tagType=types[selectedType][1],
			after=""
		}) => {
		const { data, loading, error } = await apolloClient.query<SearchTags>({
			query: SEARCH_TAGS,
			variables: {
				title: title,
				first: FIRST,
				after: after,
				tagType: tagType,
				courseCode: courseCode
			},
			fetchPolicy: 'network-only'
		})
		setData(data)
		setLoading(loading)
		setError(error)
		return {data, loading, error} 
	}

	return (
		<div
			className="flex flex-col h-36 w-full items-center justify-center bg-secondary-100 text-secondary border-2 border-secondary-200 rounded-lg rtl"
		>
			{/* Wrapper for design (bg-color) */}
			<div
				className="h-full w-full flex flex-col"
			>
				<div
					className="w-full flex flex-row rounded-lg gap-1 p-1"
				>
					<div
						// keep the size fixed, if not, it will change based on the text!
						className="w-32 md:w-40 h-full relative"
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
							className="h-full w-full text-base md:text-xl bg-secondary-200 rounded-lg font-semibold py-2 md:py-3 px-1 relative"
						>
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-6 h-6 absolute" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
							{/* {`حسب ال${types[selectedType][0]}`} */}
							{types[selectedType][0]}
						</button>

						{toggleTypesMenu && <div
							className="absolute bg-secondary-200 w-full grid grid-cols-1 gap-2 p-2 justify-center shadow-xl z-10 rounded-lg mt-1 overflow-hidden"
						>
							{types.map((entry, index) => {
								return (
									<button
										className="h-10 w-full bg-secondary-100 rounded-lg font-semibold"
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
					<div
						className="w-2/3 md:flex-grow h-full relative"

						onFocus={() => {
							setToggleSearch(true);
						}}
						onBlur={(e) => {
							if (!e.currentTarget.contains(e.relatedTarget as Node)){
								setToggleSearch(false)
							}
						}}
					>
						<form
							className="h-full w-full relative"
							onSubmit={(e) => {
								e.preventDefault()
								if (tag.length > 0) {
									getSearchTags({ title: tag})
									setSubmit(true)
								}
							}}
						>
							<input 
								className="h-full w-full rtl px-4 bg-secondary-200 rounded-lg text-base md:text-lg text-secondary placeholder-secondary outline-none relative"
								placeholder={`البحث حسب ال${types[selectedType][0]}`}
								ref={inputTag}
								value={tag}
								onChange={(e) => {
									setTag(e.target.value);
									if (submit) {
										setSubmit(false)
									}
								}} 
								onClick={() => {
									getSearchTags({ title: tag })
								}}
								
							/>

							{/* search icon */}
							<button
								className="absolute left-2 h-full bg-secondary-200"
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</button>
						</form>
						{toggleSearch && <div
							className="h-44 md:h-56 absolute bg-secondary-200 w-full flex flex-col items-center justify-center shadow-xl z-10 rounded-lg mt-1 overflow-hidden"
							
						>
							{/* Wrapper for scroll */}
							<div
								className="h-full w-full overflow-y-scroll"
								ref={divSearch}
									onScroll={() => {
										if (divSearch.current?.scrollHeight! - divSearch.current?.scrollTop! === divSearch.current?.clientHeight!) {
											if (data?.tags?.pageInfo.hasNextPage){
												const nextAfter = data?.tags?.pageInfo?.endCursor!
												getSearchTags({
													after: nextAfter
												})
											}
										}
									}}
							>
								<div
									className="w-full flex flex-col flex-wrap gap-2 p-2"
								>
									{/* If creatable */}
									{
										creatable && 
										tags?.filter(t => t === tag).length === 0 &&  // Tag not in the tag list
										tag.length > 0 && 
										
										<button
											className="flex-grow h-10 w-full bg-secondary-100 rounded-lg font-semibold relative text-secondary"
											onClick={() => {
												setTags(tags!?.concat(tag))
												setTag("")

												// When the item gets removed from the div, its onHover event.currentTag.contains won't work 
												inputTag.current?.focus()

												// Re-populate
												getSearchTags({title: ""})
											}}
										>
											<p
												className="absolute right-1 text-sm font-normal flex gap-1"
											>
												<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
												إنشاء
											</p>
											<span className="font-bold">{tag}</span>
										</button>}

									{/* {data?.tags?.edges.length === 0 && tags?.indexOf(tag) === -1 && tag.length > 0 && */}
									{tag.length > 0 && !submit &&
										<button
											className="flex-grow h-10 w-full bg-secondary-100 rounded-lg font-semibold relative"
											onClick={() => {
												// if (creatable) {
												// 	setTags(tags!?.concat(tag))
												// 	setTag("")
	
												// 	// When the item gets removed from the div, its onHover event.currentTag.contains won't work 
												// 	inputTag.current?.focus()
												// }
												if (tag.length > 0) {
													getSearchTags({ title: tag})
													setSubmit(true)
												}
											}}
										>
											<p
												className="absolute right-1 text-sm font-normal flex gap-1"
											>
												<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="keyboard" className="w-6 h-6 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm8 336c0 4.411-3.589 8-8 8H48c-4.411 0-8-3.589-8-8V112c0-4.411 3.589-8 8-8h480c4.411 0 8 3.589 8 8v288zM170 270v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-336 82v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm384 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zM122 188v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-98 158v-16c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v16c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"></path></svg>
												بحث
											</p>
											<span className="font-bold">{tag}</span>
										</button>
									}

									{/* Filter items in list */}
									{/* {data?.tags?.edges.filter(tag => tags?.indexOf(tag?.node?.title!) === -1).map(edge => { */}
									{data?.tags?.edges.map(edge => {
										return (
											<button
												className={classNames("flex-initial h-10 w-full bg-secondary-100 rounded-lg font-semibold relative", {
													"opacity-50 cursor-not-allowed": tags?.indexOf(edge?.node?.title!) !== -1
												})}
												onClick={() => {
													setTags(tags!?.concat(edge?.node?.title!))
													// When the item gets removed from the div, its onHover event.currentTag.contains won't work 
													inputTag.current?.focus()
												}}
											>
												{edge?.node?.title}

												{/* Show this icon when item is checked */}
												{tags?.indexOf(edge?.node?.title!) !== -1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline absolute right-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
												</svg>}
											
											</button> 
											// <button
											// 	className="h-10 w-full opacity-80 cursor-not-allowed"
											// >
											// 	{edge?.node?.title}
											// </button>

										)
									})}
									
									{
										data?.tags?.edges.length === 0 && submit && <div className="w-full flex flex-col items-center justify-center gap-2">
											
											<p
												className="flex items-center justify-center md:text-lg font-semibold"
											>
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
												</svg>
												لاتتوفر نتائج
											</p>
											
										</div>
									}
								</div>
							</div>
							
						</div>}

					</div>
				</div>

				{/* line */}
				<div
					className="w-full flex justify-center mb-1"
				>
					<div className="border-b border-secondary-200 w-3/6"></div>
				</div>
				
				<div
					className="h-2/3 w-full relative bg-secondary-100 rounded-b-lg overflow-hidden"
				>
					{/* X button that deletes all tags */}
					{tags?.length! > 0 && <button
						className="absolute left-1 bg-primary md:w-10 md:h-10 w-7 h-7 shadow-md rounded-lg flex items-center justify-center"
						onClick={() => {
							setTags([])
						}}
					> 
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>}
					<div
						className="flex-grow flex flex-row items-start justify-start gap-1 md:gap-4 mx-1 flex-wrap overflow-y-scroll h-full scrollbar-thumb-secondary scrollbar-track-transparent"
					>
						{tags?.length === 0 && <p
							className="text-sm md:text-lg opacity-50 w-full flex items-center justify-center h-full"
						>
							{!creatable && "قم بتحديد وسم أو أكثر لفلترة النتائج"}	
							{creatable && "قم بتحديد أو إضافة وسوم الى المشاركة"}	
						</p>}
						{tags?.map(tag => {
							return (
								<div
									className={classNames("flex flex-row items-center justify-center gap-2 text-secondary bg-primary px-1 rounded-full", {
										"border-gradient-br-blue-green-gray-900 gradient-border-3": data?.tags?.edges.filter(edge => edge?.node?.title === tag).length === 0
									})}
								>
									<p
										className="inline-block font-semibold p-1 text-sm md:text-base"
									>
										{tag}
									</p>
									<button
										className="text-secondary bg-primary-100 w-6 p-1 rounded-full"	
										onClick={() => {
											setTags(tags?.filter(item => item !== tag))
										}}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
										</svg>
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