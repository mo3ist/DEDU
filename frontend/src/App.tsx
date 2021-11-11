import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'

import apolloClient from "./common/apollo-client/apollo-client"
import CoursePage from './pages/course-page/course-page'
import LectureListingPage from './pages/lecture-listing-page/lecture-listing-page'
import QnAListingPage from './pages/qna-listing-page/qna-listing-page';
import ResourceListingPage from './pages/resource-listing-page/resource-listing-page';
import SummaryListingPage from './pages/summary-listing-page/summary-listing-page';
import ResourceCreationPage from './pages/resource-creation-page/resource-creation-page';
import SummaryCreationPage from './pages/summary-creation-page/summary-creation-page';
import QuestionCreationPage from './pages/question-creation-page/question-creation-page';
import GenericDetail from './common/components/generic-detail/generic-detail';
import SummaryDetail from './pages/summary-detail/summary-detail';
import ResourceDetail from './pages/resource-detail/resource-detail';
import QuestionDetail from './pages/question-detail/question-detail';
import QuestionEdit from './pages/question-edit/question-edit';
import ResourceEdit from './pages/resource-edit/resource-edit';
import SummaryEdit from './pages/summary-edit/summary-edit';
import Authenticate from './pages/authentication/authenticate';


// I DON'T BELIEVE IN REDUNDANCY LOL

function App() {
  return (
	  <div
	  	className="flex-1 font-cairo w-full"
	  >
		<ApolloProvider client={ apolloClient }>
			<Router>
				<Switch>
					<Route path="/auth/">
						<Authenticate />
					</Route>

					<Route path="/courses/:course/resource/detail/:id/">
						<ResourceDetail />
					</Route>
					<Route path="/courses/:course/summary/detail/:id/">
						<SummaryDetail /> 
					</Route>
					<Route path="/courses/:course/question/detail/:id/">
						<QuestionDetail />
					</Route>
					<Route path="/courses/:course/question/edit/:id/">
						<QuestionEdit />
					</Route>
					<Route path="/courses/:course/resource/edit/:id/">
						<ResourceEdit />
					</Route>
					<Route path="/courses/:course/summary/edit/:id/">
						<SummaryEdit />
					</Route>

					<Route path="/courses/:course/lecture/">
						<LectureListingPage />
					</Route>
					
					<Route path="/courses/:course/question/create">
						<div
							className="flex flex-col"
						>
							<QuestionCreationPage />
						</div>
					</Route>
					<Route path="/courses/:course/question/">
						<QnAListingPage />
					</Route>
					<Route path="/courses/:course/summary/create">
						<div
							className="flex flex-col"
						>
							<SummaryCreationPage />
						</div>
					</Route>
					<Route path="/courses/:course/summary/">
						<SummaryListingPage />
					</Route>
					<Route path="/courses/:course/quiz/">
						<h1>{"<Quizzes />"}</h1>
					</Route>
					<Route path="/courses/:course/resource/create">
						<div
							className="flex flex-col"
						>
							<ResourceCreationPage />
						</div>
					</Route>
					<Route path="/courses/:course/resource/">
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
