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
    edits: [PromiseType!]! # Promises edited by this user
    createdAt: String!
    updatedAt: String!
  }

  type PromiseType {
    id: ID!
    title: String!
    description: String!
    editedBy: User!          # User who last edited this promise
    editedById: ID!      # ID  IDuser who last edited
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
    editedById: ID! # ID  IDuser creating the promise
    version: Int!       # Version of the promise
    status: StatusUs!   # Status of the promise
  }

  input UpdatePromiseInput {
    title: String
    description: String
    status: StatusUs
    editedById: ID!
    updatedAt: String
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
    getPromises: [PromiseType]
    getPromise(id: ID!): PromiseType
    testQuery: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPromise(input: CreatePromiseInput!): PromiseType!
    updatePromise(id: ID!, input: UpdatePromiseInput!): PromiseType
  }
`;

export default typeDefs;