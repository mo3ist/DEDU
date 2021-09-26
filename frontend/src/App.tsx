import React from 'react';
import { HelloWorld } from './pages/CourseMainPage'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
	uri: 'http://127.0.0.1:8000/graphql/',
	cache: new InMemoryCache()
});

function App() {
  return (
	  <ApolloProvider client={ client }>
		  <HelloWorld />
	  </ApolloProvider>
  );
}

export default App;
