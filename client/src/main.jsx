import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import './styles/index.css'
import App from './App'

const errorLink = onError((error) => {
  const { graphQLErrors, networkError } = error;
  console.log('error', error);
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' })

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  // link: from([errorLink, httpLink]),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback='⚠️Something went wrong'>
      <ApolloProvider client={client}>
        <App></App>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
