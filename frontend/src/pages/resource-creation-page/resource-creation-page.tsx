import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import Success from '../../common/components/success/success';
import Loading from '../../common/components/loading/loading';
import GenericCreation from '../../common/components/generic-creation/generic-creation';

interface Props {

}

const CREATE_RESOURCE = gql`
	mutation MutateResource($title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createResource(input: {
			title: $title,
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			resource {
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

const ResourceCreationPage: React.FC<Props> = () => {

	const [createQuestion, { loading, error, data }] = useMutation(CREATE_RESOURCE)
	const courseCode = useParams<{ course: string }>().course

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative my-8 mx-48 rounded-lg">
			{data && <Success />}
			
			{loading && <Loading />}

			<GenericCreation 
				courseCode={courseCode}
				onSubmit={({ title, body, tags }) => {
					createQuestion({
						variables: {
							title: title,
							body: body,
							courseCode: courseCode,
							tags: tags
						}
					})
				}}
			/> 
		</div>
	)
}


export default ResourceCreationPage;