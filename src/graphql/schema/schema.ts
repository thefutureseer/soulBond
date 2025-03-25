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
    edits: [PromiseType] # Promises edited by this user
    editslog: [EditType] # edits by this user
    createdAt: String!
    updatedAt: String!
  }

  type PromiseType {
    id: ID!
    title: String!
    description: String!
    edits(offset: Int, limit: Int): [PromiseType!]!   # Promises edited by this promise
    version: Int!
    createdAt: String!
    updatedAt: String!
    status: StatusUs!
    parentId: ID             # ID of the parent promise
    parent: PromiseType      # Parent promise
    createdBy: User           # User who edited the promise
    createdById: ID           # ID of the user who edited the promise
  }

  type EditType {
    id: ID!
    editedBy: User!
    parentId: ID             # ID of the parent promise
    parent: PromiseType      # Parent promise
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