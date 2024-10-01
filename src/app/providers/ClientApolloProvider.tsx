"use client";
import React, { ReactNode } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, from } from '@apollo/client';
//bring in type for children 
import { ClientApolloProviderProps } from 'app/types/context';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://soulbond.onrender.com/api/graphql';;

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});



const ClientApolloProvider: React.FC<ClientApolloProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;