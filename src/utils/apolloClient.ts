import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    link: errorLink.concat(new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URI || 'http://localhost:3000/graphql',
      credentials: 'include',
    })),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;