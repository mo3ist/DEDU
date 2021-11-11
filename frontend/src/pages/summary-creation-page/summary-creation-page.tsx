import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Success from '../../common/components/success/success';
import Loading from '../../common/components/loading/loading';

interface Props {

}

const CREATE_SUMMARY = gql`
	mutation MutateSummary($title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createSummary(input: {
			title: $title,
			body: $body,
			course: $courseCode,
			tagSet: $tags,
		}) {
			summary {
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

const SummaryCreationPage: React.FC<Props> = () => {
	const [createQuestion, { loading, error, data }] = useMutation(CREATE_SUMMARY)
	const courseCode = useParams<{ course: string }>().course

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative">
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

export default SummaryCreationPage;