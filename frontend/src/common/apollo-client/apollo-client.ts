import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, makeVar } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
	
	// !IMPORTANT: 
	// NOTE:
	// This fucker right here cause a HUGE bug that would've taken my hours if not even days to find.
	// You see, 'graphene_jwt' authenticates with HTTP authorization header, however, 'graphene social auth'
	// authenticates with a mutation. So, if a new user is created without the authorization header getting removed, it will OVERWRITE
	// the previous user with the newly loggen in one! because the authorization header comes first.  
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
				currentUser: {
					read(_, { variables }) {
						return currentUserVar();
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
						
						// DIRTY FIX: Only merge in case of pagination. Else, take in the existing.
						// This fix exists because I'm using useApolloClient directly to make requests.
						// SO: The pagination will be like this: when you click away from the component and start over, it 
						// will start from page 0 again. won't cache. Good enough for now.
						if (incoming?.pageInfo?.startCursor === existing?.pageInfo?.startCursor) {
							return incoming
						}


						// clean this shit please
						return {
							...incoming, 
							edges: [
								...existing?.edges,
								...incoming?.edges
							],
							pageInfo: {
								...incoming.pageInfo,
								startCursor: existing?.pageInfo?.startCursor ? // the initial value is undefined, so take the first valid value
												existing?.pageInfo?.startCursor :
												incoming?.pageInfo?.startCursor
							}
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

export type CurrentUser = {
	id: string;
	name: string;
	profilePicture: string;
}

export const currentUserVar = makeVar<CurrentUser | null>(JSON.parse(localStorage.getItem("currentUserVar")!)) 

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