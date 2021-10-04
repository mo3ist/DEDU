import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CoursePage from './pages/course-page/course-page'
import LectureListingPage from './pages/lecture-listing-page/lecture-listing-page'

const client = new ApolloClient({
	uri: 'http://127.0.0.1:8000/graphql/',
	cache: new InMemoryCache()
});

function App() {
  return (
	<ApolloProvider client={ client }>
		<Router>
			<Switch>
				<Route path="/courses/:course/lectures/">
					<LectureListingPage />
				</Route>
				<Route path="/courses/:course/qnas/">
					<h1>{"<QnAs />"}</h1>
				</Route>
				<Route path="/courses/:course/summaries/">
					<h1>{"<Summaries />"}</h1>
				</Route>
				<Route path="/courses/:course/quizzes/">
					<h1>{"<Quizzes />"}</h1>
				</Route>
				<Route path="/courses/:course/resources/">
					<h1>{"<Resources />"}</h1>
				</Route>
				<Route path="/courses/">
					<CoursePage />
				</Route>
			</Switch>
		</Router>
	</ApolloProvider>
  );
}

export default App;
