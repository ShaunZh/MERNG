import React from 'react'
import { message } from 'antd'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { StyleProvider } from '@ant-design/cssinjs';
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import './styles/index.css'
import App from './App'
import { TOKEN_KEY } from './utils/constants';

const errorLink = onError((error) => {
  const { graphQLErrors, networkError } = error;
  console.log('error', error);
  if (graphQLErrors)
    message.error(graphQLErrors[0].message)
  if (networkError) {
    message.error(networkError)
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
 
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

function fallbackRender({ error, resetErrorBoundary }) {

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={fallbackRender }>
      <ApolloProvider client={client}>
        <StyleProvider hashPriority="high">
          <App></App>
        </StyleProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
