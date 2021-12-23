import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import classname from 'classnames'

import TextEditor from '../text-editor/text-editor';
import TagSearch from '../tag-search/tag-search';
import { GetEditableQuestion_questions_edges_node } from '../../../pages/question-edit/__generated__/GetEditableQuestion';
import { GetEditableResource_resources_edges_node } from '../../../pages/resource-edit/__generated__/GetEditableResource';
import { GetEditableSummary_summaries_edges_node } from '../../../pages/summary-edit/__generated__/GetEditableSummary';

const imgbbUploader = require('imgbb-uploader')

interface Props {
	content?: GetEditableQuestion_questions_edges_node | GetEditableResource_resources_edges_node | GetEditableSummary_summaries_edges_node | null;
	courseCode: string;
	onSubmit(data: {
		title: string | null,
		body: string | null,
		tags: string[] | null,
	}): void
}

const GenericCreation: React.FC<Props> = ({ content, courseCode, onSubmit }) => {

	useEffect(() => {
		setTitle(content?.title! || "")
		setBody(content?.body! || "")
		setTags(content?.tagSet?.edges.map(edge => edge?.node?.title!)! || [])
	}, [ content ])
	
	const [title, setTitle] = useState<string>("")
	const [body, setBody] = useState<string>("")
	const [tags, setTags] = useState<Array<string>>([])
	
	const [validForm, setValidForm] = useState<boolean>(true)

	const editor = useRef<JoditEditor>(null)

	const base64toURL = async (text: string | null) => {
		const imgs = text?.match(/(data:image\/[^;]+;base64[^"]+)/gm)

		// Avoid the fucking errors :)
		if (imgs === null || imgs === undefined) {
			return body
		}

		var newText = body;

		var res: void[] = await Promise.all(
			imgs!?.map(
				async (img: string): Promise<void> => {
					var url = ''; 
					try {
						const res = await imgbbUploader({

							// WARNING: FATAL SECURITY ISSUE. PRIVATE KEYS WILL BE INCLUDED IN THE BUILD!
							apiKey: process.env.REACT_APP_IMGBB_API_KEY,
							base64string: img.split("base64,")[1] // The base64 string itself
						})
						
						url = res.url
						
					} catch (e) {
					}
					newText = newText?.replace(img, url)!
				}
			)
		)
		return newText
	} 

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative">
			<div
				className="w-full"
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					العنوان
					{/* <span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(يرجى كتابته بشكل واضح)
					</span> */}
				</p>
				<div
					className={classname("rounded-lg overflow-hidden", {
						"border-2 border-dashed border-primary-100": !validForm && title?.length === 0
					})}
				>
					<div
						className="border-2 border-secondary-200 rounded-lg overflow-hidden"
					>
						<input 
							value={title!}
							type="text" 
							onChange={(e) => {setTitle(e.target.value)}} 
							className="w-full rounded-sm text-lg px-4 py-1"
						/>
					</div>
				</div>
			</div>
			<div
				className=""
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					الوصف
					{/* <span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(نبذة بسيطة عن الملخص مرفقة بالروابط)
					</span> */}
				</p>
				<div
					className={classname("rounded-lg overflow-hidden", {
						"border-2 border-dashed border-primary-100": !validForm && body?.length === 0
					})}
				>
					<div
						className="border-2 border-secondary-200 rounded-lg overflow-hidden"
					>
						<TextEditor
							ref={editor}
							value={body}
							readonly={false}
							onBlur={newContent => {
								setBody(newContent)
							}} // preferred to use only this option to update the content for performance reasons
						/>
					</div>
				</div>
			</div>
			<div>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					الوسوم
					<span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(برجاء التدقيق في اختيار الوسوم)
					</span>
				</p>
				<div
					className={classname("rounded-lg", {
						"border-2 border-dashed border-primary-100": !validForm && tags?.length === 0
					})}
				>					
					<TagSearch tags={tags!} setTags={setTags} courseCode={courseCode} creatable={true}/>
				</div>
			</div>
			<div>
				<button 
					className="bg-secondary-200 w-full text-2xl md:text-3xl text-secondary p-2 md:p-4 rounded-lg"
					onClick={async () => {
						if (title?.length !== 0 && body?.length !== 0 && tags?.length !== 0) {
							const text = await base64toURL(body)
							onSubmit({
								title: title,
								body: text,
								tags: tags
							})
						} else {
							setValidForm(false)
						}
					}}
				>
					مشاركة
				</button>
			</div>
			
		</div>
	)
}

export default GenericCreation;