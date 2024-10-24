"use client";

import React from 'react'; 
import { 
  ApolloProvider, 
  ApolloClient, 
  InMemoryCache, 
  split 
} from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ClientApolloProviderProps } from 'types/context';

// Define the HTTP link for queries and mutations
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // Use env variable for HTTP URL
});

// Define the WebSocket link for handling subscriptions
const wsLink = new WebSocketLink({
  uri: process.env.NEXT_PUBLIC_WS_URL || 'ws://soulbond.onrender.com/api/graphql', // Use env variable for WebSocket URL
  options: {
    reconnect: true, // Automatically reconnect if the connection drops
  },
});

// Split the connection based on the operation type (queries vs. subscriptions)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // Use WebSocket for subscriptions
  httpLink // Use HTTP for queries and mutations
);

// Create the Apollo Client instance with the split link and an in-memory cache
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

// Define the ClientApolloProvider component to wrap children with ApolloProvider
const ClientApolloProvider: React.FC<ClientApolloProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;