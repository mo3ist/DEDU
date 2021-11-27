import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import classname from 'classnames'
import TagSearch from '../tag-search/tag-search';
import TextEditor from '../text-editor/text-editor';
import { GetEditableQuiz_quizzes_edges_node } from '../../../pages/quiz-edit/__generated__/GetEditableQuiz';

const imgbbUploader = require('imgbb-uploader')

interface Props {
	content?: GetEditableQuiz_quizzes_edges_node | null;
	// courseCode: string;
	onSubmit(data: {
		title: string | null,
		a: string | null,
		b: string | null,
		c: string | null,
		d: string | null,
		answer: string | null,
		tags: string[] | null,
	}): void
}

// const QuizCreation: React.FC<Props> = ({ content, courseCode, onSubmit }) => {
const QuizCreation: React.FC<Props> = ({ content, onSubmit }) => {
	
	const [title, setTitle] = useState<string | null>(content?.title! || "")
	const [tags, setTags] = useState<Array<string> | null>(content?.tagSet?.edges.map(item => item?.node?.title!)! || [])
	const [options, setOptions] = useState([content?.a! || "", content?.b! || "", content?.c! || "", content?.d! || ""])
	const [answer, setAnswer] = useState(content?.answer! || "")

	const [validForm, setValidForm] = useState<boolean>(true)

	const editor = useRef<JoditEditor>(null)

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative text-secondary">
			<div
				className=""
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					السؤال
				</p>
				<div
					className={classname({
						"border-2 border-dashed border-primary-100": !validForm && title?.length === 0
					})}
				>
					<div
						className="border-2 border-secondary-200"
					>
						<TextEditor
							ref={editor}
							value={title}
							formattingonly={true}
							onBlur={newContent => {
								setTitle(newContent)
							}} // preferred to use only this option to update the content for performance reasons
							
						/>
					</div>
				</div>
			</div>
			<div>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					الإختيارات
				</p>
				<div
					className={classname({
						"border-2 border-dashed border-primary-100": !validForm && options.filter(option => option.length !== 0)?.length < 2 
					})}
				>
					<div className="grid grid-cols-1 gap-2">
							{options.map((value, index) => {
								return (
									<div
										className="w-full flex flex-row gap-2 items-center"
									>
										<span className="font-bold">{index+1}.</span>
										<input 
											type="text" 
											value={value!}
											onChange={(e) => {setOptions(options.map((itm, idx) => idx === index ? e.target.value : itm))}} 
											className="flex-grow rounded-lg pr-2" />
										<button 
											className={classname("w-16 bg-primary rounded-lg h-full", {"opacity-50 cursor-not-allowed": options.length === 2})}
											onClick={() => setOptions(options.filter((_, i) => i !== index))}
											disabled={options.length === 2}	
										>
											x
										</button>
									</div>
								)
							})}
						<button
							className={classname("h-10 bg-primary rounded-lg", {"opacity-50 cursor-not-allowed": options.length === 4})}
							onClick={() => setOptions(options.concat(""))}
							disabled={options.length === 4}
						>
							المزيد
						</button>
					</div>
				</div>
			</div>

			<div>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary mb-1"
				>
					الإجابة
				</p>

				<div
					className={classname({
						"border-2 border-dashed border-primary-100": !validForm && answer.length === 0
					})}
				>
					<div className="grid grid-cols-1 gap-2">
						{options.map((value, index) => {
							return (
								<div
									className="w-full flex flex-row gap-2 items-center"
									key={index}
								>
									<input
										type="radio" 
										id={index.toString()} 
										name="answer" 
										className="w-5 h-5" 
										onClick={() => setAnswer(value)}
										// checked={value === content?.answer}
									/>
									<label htmlFor={index.toString()}><span className="font-bold">{index+1}.</span> {value}</label>
								</div>
							)
						})}
					</div>
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
				<div
					className={classname({
						"border-2 border-dashed border-primary-100": tags?.length === 0
					})}
				>
					<TagSearch tags={tags!} setTags={setTags} courseCode="291V5" creatable={true}/>
				</div>
			</div>
			<div>
				<button 
					className="bg-secondary-200 w-full h-20 text-3xl text-secondary"
					onClick={async () => {
						if (
							title !== null && 
							tags !== null && 
							options.filter(option => option !== null) !== null &&
							answer !== null
						) {
							onSubmit({
								title: title,
								a: options[0],
								b: options[1],
								c: options[2],
								d: options[3],
								answer: answer,
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

export default QuizCreation;