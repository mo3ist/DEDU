import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, makeVar } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getOperationDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem("accessToken");

	// TODO: Stop the request from going forward
	// const operationType = getOperationDefinition(operation.query)?.operation
	// if (operationType === "mutation" && !token){
	// 	window.location.href = "/auth" 
	// }

	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: token ? `JWT ${token}` : "",
		  }
	}));

	return forward(operation);

})


const apolloClient = new ApolloClient({
	link: from([
		authMiddleware,
		httpLink
	]),
	cache: new InMemoryCache({
		typePolicies: {
			UserTypeConnection: {
				fields: {
					isLoggedIn: {
						read(_, { variables }) {
							return localStorage.getItem("accessToken") !== null;
						}
					}
				}
			},
			Query: {
				fields: {
					// lectures: {
					// 	keyArgs: ['tag_Title', 'course_Code'],
					// 	merge(existing = {edges: [], pageInfo: {}}, incoming){
					// 		// clean this shit please
					// 		return {
					// 			...incoming, 
					// 			edges: [
					// 				...existing?.edges,
					// 				...incoming?.edges
					// 			]
					// 		}
					// 	}
					// },
					questions: {
						keyArgs: ['id', 'tag_Title', 'course_Code'],
						merge(existing = {edges: [], pageInfo: {}}, incoming){
							// clean this shit please
							return {
								...incoming, 
								edges: [
									...existing?.edges,
									...incoming?.edges
								]
							}
						}
					},
					resources: {
						keyArgs: ['id', 'tag_Title', 'course_Code'],
						merge(existing = {edges: [], pageInfo: {}}, incoming){
							// clean this shit please
							return {
								...incoming, 
								edges: [
									...existing?.edges,
									...incoming?.edges
								]
							}
						}
					}, 
					summaries: {
						keyArgs: ['id', 'tag_Title'],
						merge(existing = {edges: [], pageInfo: {}}, incoming){
							// clean this shit please
							return {
								...incoming, 
								edges: [
									...existing?.edges,
									...incoming?.edges
								]
							}
						}
					}, 
					tags: {
						keyArgs: ['id', 'title', 'tagType', 'course_Code'],
						merge(existing = {edges: [], pageInfo: {}}, incoming){
							// clean this shit please
							return {
								...incoming, 
								edges: [
									...existing?.edges,
									...incoming?.edges
								]
							}
						}
					},
				}
			}
		}
	})
});

export const isLoggedIn = makeVar<boolean>(false);

export default apolloClient