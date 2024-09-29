"use client";
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3000/api/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const ClientApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;