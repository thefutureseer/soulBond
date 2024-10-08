"use client";

import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
//bring in type for children 
import { ClientApolloProviderProps } from 'types/context';

const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === 'development'
    ? "http://localhost:3000/api/graphql" 
    : 'https://soulbond.onrender.com/api/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const ClientApolloProvider: React.FC<ClientApolloProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;