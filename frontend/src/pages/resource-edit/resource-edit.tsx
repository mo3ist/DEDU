import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GenericCreation from '../../common/components/generic-creation/generic-creation';
import Loading from '../../common/components/loading/loading';
import Success from '../../common/components/success/success';
import { GetEditableResource, GetEditableResource_resources_edges_node } from './__generated__/GetEditableResource';

interface Props {

}

const EDIT_RESOURCE = gql`
	mutation EditResource($modId: ID!, $title: String!, $body: String!, $courseCode: String!, $tags: [String]) {
		createResource(input: {
			mod: $modId
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

const GET_EDITABLE_RESOURCE = gql`
	query GetEditableResource($id: ID!) {
		resources(id: $id) {
			edges {
				node {
					id
					title
					body
					tagSet {
						edges {
							node {
								title
								tagType
							}
						}
					}
					mod {
						id
					}
				}
			}
		}
	}
`

const ResourceEdit: React.FC<Props> = () => {
	
	const [resource, setResource] = useState<GetEditableResource_resources_edges_node | null>(null)
	const [editResource, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(EDIT_RESOURCE)
	
	const { course: courseCode, id } = useParams<{ course: string, id: string }>()
	
	const { loading: queryLoading, error: queryError, data: queryData } = useQuery<GetEditableResource>(GET_EDITABLE_RESOURCE, {
		onCompleted: (data) => {
			setResource(data.resources?.edges[0]?.node!)
		},
		variables: {
			id: id
		}
	})
	
	const checkNewTags = (tags: string[]): boolean => {
		return tags.filter(is_new => !resource?.tagSet?.edges.map(tag => tag?.node?.title).includes(is_new)).length > 0
	}

	return (
		<div className="grid grid-cols-1 gap-4 bg-secondary-100 p-2 rtl relative h-full rounded-lg main-margin">
			{mutationData && <Success redirectUrl={`/courses/${courseCode}/resource/`} />}
			
			{(queryLoading || mutationLoading) && <Loading />}

			<GenericCreation 
				content={resource}
				courseCode={courseCode}
				onSubmit={({ title, body, tags }) => {
					// TODO: Tag inequality
					if (title !== resource?.title || body !== resource?.body || checkNewTags(tags!)) {
						editResource({
							variables: {
								modId: resource?.mod?.id,
								title: title,
								body: body,
								courseCode: courseCode,
								tags: tags
							}
						})
					}
				}}
			/>
		</div>
	)
}

export default ResourceEdit;