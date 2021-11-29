import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import classname from 'classnames'
import TextEditor from '../text-editor/text-editor';
import { GetEditableAnswer_answers_edges_node } from '../../../pages/answer-edit/__generated__/GetEditableAnswer';

const imgbbUploader = require('imgbb-uploader')

interface Props {
	content?: GetEditableAnswer_answers_edges_node | null;
	courseCode: string;
	onSubmit(data: {
		body: string | null,
	}): void
}

// const QuizCreation: React.FC<Props> = ({ content, courseCode, onSubmit }) => {
// const AnswerCreation: React.FC<Props> = ({ content, onSubmit }) => {
const AnswerCreation: React.FC<Props> = ({ content, onSubmit }) => {

	// const [body, setBody] = useState<string | null>(content?.title! || "")
	const [body, setBody] = useState<string | null>(content?.body || "")
	// const [tags, setTags] = useState<Array<string> | null>(content?.tagSet?.edges.map(item => item?.node?.title!)! || [])
	const [tags, setTags] = useState<Array<string> | null>([])

	// useEffect(() => {
	// 	console.log(body, tags, options, answer)
	// }, [body, tags, options, answer])
	
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
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative text-secondary rounded-lg">
			<div
				className=""
			>
				<p
					className="font-bold text-primary text-xl border-b border-primary pb-1 mb-1"
				>
					الإجابة
				</p>
				<div
					className={classname({
						"border-2 border-dashed border-primary-100": !validForm && body?.length === 0
					})}
				>
					<div
						className="border-2 border-secondary-200 rounded-lg overflow-hidden"
					>
						<TextEditor
							ref={editor}
							value={body}
							onBlur={newContent => {
								setBody(newContent)
							}} // preferred to use only this option to update the content for performance reasons
							
						/>
					</div>
				</div>
			</div>

			<div>
				<button 
					className="bg-secondary-200 w-full p-2 md:p-4 text-2xl md:text-3xl text-secondary rounded-lg"
					onClick={async () => {
						if (
							body !== ""
						) {
							const text = await base64toURL(body)
							onSubmit({
								body: text,
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

export default AnswerCreation;