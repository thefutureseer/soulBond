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
    editedById: String!      # ID of the user who last edited
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
    editedById: String! # ID of the user creating the promise
    version: Int!       # Version of the promise
    status: StatusUs!   # Status of the promise
  }

  input UpdatePromiseInput {
    id: ID!
    title: String
    description: String
    status: StatusUs
    editedById: String! # ID of the user making the edit
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