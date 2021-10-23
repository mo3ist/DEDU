import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoditEditor from "jodit-react";

import TagSearch from '../../common/components/tag-search/tag-search';

const imgbbUploader = require('imgbb-uploader')

interface Props {

}

const CREATE_RESOURCE = gql`
	mutation MutateResource($title: String!, $body: String!, $course: String!, $tags: [String]) {
		createResource(input: {
			title: $title,
			body: $body,
			course: $course,
			tagSet: $tags,
		}) {
			resource {
				title
				body
				course {
					code
				}
				user {
					email
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

const ResourceCreationPage: React.FC<Props> = () => {

	const [createResource, { loading, error, data }] = useMutation(CREATE_RESOURCE)

	const [tags, setTags] = useState<Array<string> | null>([])
	const courseCode = useParams<{ course: string }>().course

	const [title, setTitle] = useState<string | null>("")
	const [body, setBody] = useState<string | null>("")
	// const [tags, setTags] = useState<String | null>()

	const [value, setValue] = useState('')
	const config = {
		readonly: false,
		uploader: {
			insertImageAsBase64URI: true,
		  },
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
						url = "https://www.google.com/images/errors/robot.png"
					}
					newText = newText?.replace(img, url)!
				}
			)
		)
		return newText
	} 

	return (
		<div className="grid grid-cols-1 gap-2">
			<div>
				<input type="text" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
			</div>
			<div>
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
			<div>
				<TagSearch tags={tags!} setTags={setTags} courseCode={courseCode} creatable={true}/>
			</div>
			<div>
				<button 
					className="bg-secondary-100"
					onClick={async () => {
						const text = await base64toURL(body)
						createResource({
							variables: {
								title: title,
								body: text,
								course: "1",
								tags: tags,
							}
						})
					}}
				>
					sumbit
				</button>
			</div>
			
		</div>
	)
}

export default ResourceCreationPage;