import { gql } from 'apollo-server-micro';

// Define type definitions using GraphQL SDL
const typeDefs = gql`
  scalar JSON

  enum StatusUs {
    PENDING
    COMPLETED
    BROKEN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    edits: [SoulPromise] # Promises edited by this user
    editslog: [EditsLog] # edits by this user
    createdAt: String!
    updatedAt: String!
  }

  type SoulPromise {
    id: ID!
    title: String!
    description: String!
    edits(offset: Int, limit: Int): [EditsLog]   # Promises edited by this promise
    version: Int!
    createdAt: String!
    updatedAt: String!
    status: StatusUs!
    createdBy: User           # User who edited the promise
    createdById: ID           # ID of the user who edited the promise
  }

  type EditsLog {
    id: ID!
    editedBy: User!
    parentId: ID             # ID of the parent promise
    parent: SoulPromise      # Parent promise
    changes: JSON
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreatePromiseInput {
    title: String!
    description: String!
    version: Int!       # Version of the promise
    status: StatusUs!   # Status of the promise
  }

  input UpdatePromiseInput {
    title: String
    description: String
    status: StatusUs
    updatedAt: String
    parentId: ID
  }

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
    getPromises: [SoulPromise]
    getPromise(id: ID!): SoulPromise
    testQuery: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPromise(input: CreatePromiseInput!): SoulPromise!
    updatePromise(id: ID!, input: UpdatePromiseInput!): SoulPromise
  }
`;

export default typeDefs;