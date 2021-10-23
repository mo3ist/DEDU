import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context'

import CoursePage from './pages/course-page/course-page'
import LectureListingPage from './pages/lecture-listing-page/lecture-listing-page'
import QnAListingPage from './pages/qna-listing-page/qna-listing-page';
import ResourceListingPage from './pages/resource-listing-page/resource-listing-page';
import SummaryListingPage from './pages/summary-listing-page/summary-listing-page';
import ResourceCreationPage from './pages/resource-creation-page/resource-creation-page';

const httpLink = createHttpLink({
	uri: 'http://127.0.0.1:8000/graphql/',
  });  

const authLink = setContext((_, { headers }) => {
	const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImV4cCI6MTYzNDM0MzE0Nywib3JpZ0lhdCI6MTYzNDM0Mjg0N30.VFrUdWpkJ50J36tQw6nngDXo_jw2vsMjAhClnPyfS7M";
	return {
	  headers: {
		...headers,
		authorization: token ? `JWT ${token}` : "",
	  }
	}
  });

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
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
						keyArgs: ['tag_Title', 'course_Code'],
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
						keyArgs: ['tag_Title', 'course_Code'],
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
						keyArgs: ['tag_Title'],
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
						keyArgs: ['title', 'tagType', 'course_Code'],
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
					}
				}
			}
		}
	})
});

// I DON'T BELIEVE IN REDUNDANCY LOL

function App() {
  return (
	  <div
	  	className="flex-1 font-cairo w-full"
	  >
		<ApolloProvider client={ client }>
			<Router>
				<Switch>
					<Route path="/courses/:course/lectures/">
						<LectureListingPage />
					</Route>
					<Route path="/courses/:course/qnas/">
						<QnAListingPage />
					</Route>
					<Route path="/courses/:course/summaries/">
						<SummaryListingPage />
					</Route>
					<Route path="/courses/:course/quizzes/">
						<h1>{"<Quizzes />"}</h1>
					</Route>
					<Route path="/courses/:course/resources/create">
						<ResourceCreationPage />
					</Route>
					<Route path="/courses/:course/resources/">
						<ResourceListingPage />
					</Route>
					<Route path="/courses/">
						<CoursePage />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	  </div>
  );
}

export default App;
