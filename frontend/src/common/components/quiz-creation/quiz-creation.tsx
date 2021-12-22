import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import classname from 'classnames'
import TagSearch from '../tag-search/tag-search';
import TextEditor from '../text-editor/text-editor';
import { GetEditableQuiz_quizzes_edges_node } from '../../../pages/quiz-edit/__generated__/GetEditableQuiz';
import { useReactiveVar } from '@apollo/client';
import { currentCourseVar } from '../../apollo-client/apollo-client';

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

	const currentCourse = useReactiveVar(currentCourseVar)

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative text-secondary">
			<div
				className=""
			>
				<p
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					السؤال
				</p>
				<div
					className={classname({
						"border-2 border-dashed border-primary-100 rounded-lg": !validForm && title?.length === 0
					})}
				>
					<div
						className="border-2 border-secondary-200 rounded-lg overflow-hidden"
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
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					الإختيارات
				</p>
				<div
					className={classname({
						"border-2 border-dashed border-primary-100 rounded-lg": !validForm && options.filter(option => option.length !== 0)?.length < 2 
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
											onChange={(e) => {
												setOptions(
													options.map((itm, idx) => idx === index ? e.target.value : itm)
												)

												// THIS IS A HACK TO "BIND" THE ANSWER WITH OPTIONS:
												// USER WILL HAVE TO PICK THE ANSWER AGAIN WHEN HE CHANGES AN OPTION
												// THIS MAKES ME AVOID ACTUALLY BINDING THE ANSWER OPTION TO ANSWER
												setAnswer("")
											}} 
											className="flex-grow rounded-lg pr-2 h-8" />
										<button 
											className={classname("p-2 bg-primary rounded-lg", {"opacity-50 cursor-not-allowed": options.length === 2})}
											onClick={() => setOptions(options.filter((_, i) => i !== index))}
											disabled={options.length === 2}	
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
												<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
											</svg>
										</button>
									</div>
								)
							})}
						<button
							className={classname("p-2 md:p-3 bg-primary rounded-lg text-xl md:text-2xl", {"opacity-50 cursor-not-allowed": options.length === 4})}
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
					className="font-bold text-primary text-xl border-b-2 border-primary pb-1 mb-1"
				>
					الإجابة
				</p>

				<div
					className={classname({
						"border-2 border-dashed border-primary-100 rounded-lg": !validForm && answer.length === 0
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
										checked={value === answer}
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
					className={classname({
						"border-2 border-dashed border-primary-100 rounded-lg": tags?.length === 0 && !validForm
					})}
				>
					<TagSearch tags={tags!} setTags={setTags} courseCode={currentCourse?.code!} creatable={true}/>
				</div>
			</div>
			<div>
				<button 
					className="bg-secondary-200 w-full p-2 md:p-4 text-2xl md:text-3xl rounded-lg text-secondary"
					onClick={async () => {
						if (
							title?.length !== 0 && 
							tags?.length !== 0 && 
							options.filter(option => option.length !== 0).length !== 0 &&
							answer.length !== 0
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