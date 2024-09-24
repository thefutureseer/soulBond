import { gql } from '@apollo/client';

export const CREATE_PROMISE = gql`
  mutation CreatePromise($title: String!, $description: String!, $creatorId: ID!) {
    createPromise(title: $title, description: $description, creatorId: $creatorId) {
      id
      title
      description
      creator {
        id
        name
      }
      status
    }
  }
`;

export const GET_PROMISES = gql`
  query GetPromises {
    getPromises {
      id
      title
      description
      creator {
        id
        name
      }
      status
    }
  }
`;