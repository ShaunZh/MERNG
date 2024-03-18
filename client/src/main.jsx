import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import 'semantic-ui-css/semantic.min.css'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App'


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback='⚠️Something went wrong'>
      <ApolloProvider client={client}>
        <App></App>
      </ApolloProvider>,
    </ErrorBoundary>
  </React.StrictMode>,
)
