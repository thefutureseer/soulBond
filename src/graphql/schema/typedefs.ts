import { gql } from 'apollo-server-micro';

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    edits: [Promise!]!
    createdAt: String!
    updatedAt: String!
  }

  type Promise {
    id: ID!
    title: String!
    description: String!
    editedBy: User!
    version: Int!
    createdAt: String!
    updatedAt: String!
    status: StatusUs!
  }

  enum StatusUs {
    PENDING
    COMPLETED
    BROKEN
  }

  type Query {
    users: [User!]!
    promises: [Promise!]!
  }

  type Mutation {
    createPromise(title: String!, description: String!, editedById: String!): Promise!
  }
`;

export default typeDefs;