"use client";

import React from 'react'; 
import { 
  ApolloProvider, 
  ApolloClient, 
  InMemoryCache, 
  // split 
} from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';
import { ClientApolloProviderProps } from 'types/context';

// Define the HTTP link for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.PORT, // Use env variable for HTTP URL
});

// Create the Apollo Client instance with the split link and an in-memory cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Define the ClientApolloProvider component to wrap children with ApolloProvider
const ClientApolloProvider: React.FC<ClientApolloProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;