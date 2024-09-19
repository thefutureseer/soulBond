'use client';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/apolloClient';

const ClientApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;