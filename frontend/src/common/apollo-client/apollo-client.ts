import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, makeVar } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

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

const cache = new InMemoryCache({
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
		CourseTypeConnection: {
			fields: {
				currentCourse: {
					read(_, { variables }) {
						return currentCourseVar();
					}
				}
			}
		},
		QuizType: {
			fields: {
				userAnswer: {
					read(value="", { variables }) {
						return value
					}
				}
			}
		},
		ClassificationTypeConnection: {
			fields: {
				currentCourse: {
					read(_, { variables }) {
						return currentClassificationVar();
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
				classifications: {
					keyArgs: ['id'],
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
				courses: {
					keyArgs: ['id'],
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
				quizzes: {
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

// TODO: Solve the cache bugs first :') 
// const waitForCache = async () => await persistCache({
// 	cache,
// 	storage: new LocalStorageWrapper(window.localStorage),
//   });  

// waitForCache()

const apolloClient = new ApolloClient({
	cache,
	link: from([
		authMiddleware,
		httpLink
	]),
});


type isLoggedInType = boolean;
export const isLoggedIn = makeVar<isLoggedInType>(false);

export type CurrentCourse = {
	id: string;
	code: string;
	title: string;
}
export const currentCourseVar = makeVar<CurrentCourse | null>(JSON.parse(localStorage.getItem("currentCourse")!));

export type CurrentClassification = {
	id: string
	code: string
	title: string
}
export const currentClassificationVar = makeVar<CurrentClassification | null>(JSON.parse(localStorage.getItem("currentClassification")!));


export default apolloClient