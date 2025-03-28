import { gql } from '@apollo/client';
import { CreatePromiseInput, UpdatePromiseInput} from 'types/graphql';

// Define the mutations
export const CREATE_PROMISE = gql`
  mutation CreatePromise($input: CreatePromiseInput!) {
    createPromise(input: $input) {
      id
      title
      description
      createdBy {
        id
        name
        email
      }
      createdById
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
      createdBy {
        id
        name
      }
      createdById
      version
      createdAt
      updatedAt
      status
    }
  }
`;

// Define the GET_PROMISE query to fetch a specific promise by ID
export const GET_PROMISE = gql`
  query GetPromise($id: ID!, $offset: Int, $limit: Int) {
    getPromise(id: $id) {
      id
      version
      title
      description
      status
      createdAt
      updatedAt
      edits(offset: $offset, limit: $limit) {
          id
          title
          description
          status
          createdAt 
          version
          parentId
      }
      parent {
        id
        title
        description
        status
        createdAt
        updatedAt
      }
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
      createdById
      version
      createdAt
      updatedAt
      parentId
    }
  }
`;