import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";
import classname from 'classnames'

import TagSearch from '../../common/components/tag-search/tag-search';

const imgbbUploader = require('imgbb-uploader')

interface Props {

}

const CREATE_QUESTION = gql`
	mutation MutateQuestion($title: String!, $body: String!, $course: String!, $tags: [String]) {
		createQuestion(input: {
			title: $title,
			body: $body,
			course: $course,
			tagSet: $tags,
		}) {
			question {
				title
				body
				course {
					code
				}
				tagSet {
					edges {
						node {
							title
						}
					}
				}
			}
		}
	}
`

const EDITOR_TOOLS = {
	image: Image
}

const QuestionCreationPage: React.FC<Props> = () => {

	
	const [createQuestion, { loading, error, data }] = useMutation(CREATE_QUESTION)

	const [tags, setTags] = useState<Array<string> | null>([])
	const courseCode = useParams<{ course: string }>().course

	const [title, setTitle] = useState<string | null>("")
	const [body, setBody] = useState<string | null>("")

	const [validForm, setValidForm] = useState<boolean>(true)

	const [value, setValue] = useState('')
	const config = {
		readonly: false,
		uploader: {
			insertImageAsBase64URI: true,
		  },
		placeholder: "اكتب هنا...",
	}

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
			{data && 
				<div
					className="absolute inset-0 bg-primary opacity-80 z-10 flex items-center justify-center"
				>
					<p
						className="text-secondary font-bold text-3xl"
					>
						تم إرسال المشاركة وبانتظار المراجعة.
					</p>
				</div>
			}
			{loading && 
			<div
				className="absolute inset-0 bg-primary opacity-80 z-10 flex items-center justify-center"
			>
				<p
					className="text-secondary font-bold text-3xl"
				>
					...
				</p>
			</div>
			}
			
			<div
				className="w-full"
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					العنوان
					<span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(يرجى كتابته بشكل واضح)
					</span>
				</p>
				<div
					className={classname({
						"border-2 border-secondary-200": validForm,
						"border-2 border-dashed border-primary-100": !validForm && title?.length === 0
					})}
				>
					<input 
						type="text" 
						// placeholder="العنوان" 
						onChange={(e) => {setTitle(e.target.value)}} 
						className="w-full rounded-sm text-lg px-4 py-1"
					/>
				</div>
			</div>
			<div
				className=""
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					الوصف
					<span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(برجاء السؤال بوضوح واستفاضة وإرفاق ما يلزم من صور وروابط)
					</span>
				</p>
				<div
					className={classname({
						"border-2 border-secondary-200": validForm,
						"border-2 border-dashed border-primary-100": !validForm && body?.length === 0
					})}
				>
					<JoditEditor
						ref={editor}
						value={value}
						config={config}
						// tabIndex={1} // tabIndex of textarea
						onBlur={newContent => {
							setBody(newContent)
						}} // preferred to use only this option to update the content for performance reasons
						
						/>
				</div>
			</div>
			<div>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					الوسوم
					<span
						className="font-normal text-sm text m-2 text-secondary"
					>
						(برجاء التدقيق في اختيار الوسوم)
					</span>
				</p>
				
				<TagSearch tags={tags!} setTags={setTags} courseCode={courseCode} creatable={true}/>
			</div>
			<div>
				<button 
					className="bg-secondary-200 w-full h-20 text-3xl text-secondary"
					onClick={async () => {
						if (title?.length !== 0 && body?.length !== 0) {
							const text = await base64toURL(body)
							createQuestion({
								variables: {
									title: title,
									body: text,
									course: courseCode,
									tags: tags,
								}
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

export default QuestionCreationPage;