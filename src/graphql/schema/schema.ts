import { gql } from 'apollo-server-micro';

 
// Define type definitions using GraphQL SDL
const typeDefs = gql`
  enum StatusUs {
    PENDING
    COMPLETED
    BROKEN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    edits: [PromiseType!]!
    createdAt: String!
    updatedAt: String!
  }

  type PromiseType {
    id: ID!
    title: String!
    description: String!
    editedBy: User!
    editedById: String!
    version: Int!
    createdAt: String!
    updatedAt: String!
    status: StatusUs!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreatePromiseInput {
    title: String!
    description: String!
    editedById: String!
  }

  input UpdatePromiseInput {
    id: ID!
    title: String
    description: String
    status: StatusUs
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getPromises: [PromiseType!]!
    getPromise(id: ID!): PromiseType
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPromise(input: CreatePromiseInput!): PromiseType!
    updatePromise(input: UpdatePromiseInput!): PromiseType!
  }
`;

export default typeDefs;