import { gql } from '@apollo/client';
import { CreatePromiseInput, UpdatePromiseInput} from '../types/graphql.d';

// Define the mutations
export const CREATE_PROMISE = gql`
  mutation CreatePromise($input: CreatePromiseInput!) {
    createPromise(input: $input) {
      id
      title
      description
      editedBy {
        id
        name
        email
      }
      editedById
      version
      createdAt
      updatedAt
      status
    }
  }
`;

// Define the GET_PROMISES query
export const GET_PROMISES = gql`
  query GetPromises {
    getPromises {
      id
      title
      description
      editedBy {
        id
        name
      }
      editedById
      version
      createdAt
      updatedAt
      status
    }
  }
`;

// Define the GET_PROMISE query to fetch a specific promise by ID
export const GET_PROMISE = gql`
  query GetPromise($id: ID!) {
    getPromise(id: $id) {
      id
      title
      description
      editedBy {
        id
        name
        email
      }
      editedById
      version
      createdAt
      updatedAt
      status
    }
  }
`;

export const UPDATE_PROMISE = gql`
  mutation UpdatePromise($id: ID!,$input: UpdatePromiseInput!) {
    updatePromise(id: $id, input: $input) {
      id
      title
      description
      status
      editedById
      version
      createdAt
      updatedAt
    }
  }
`;