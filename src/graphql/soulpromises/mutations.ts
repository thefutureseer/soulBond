import { gql } from '@apollo/client';
import { PromiseFields } from './fragments';

export const CREATE_PROMISE = gql`
  mutation CreatePromise($input: CreatePromiseInput!) {
    createPromise(input: $input) {
      ...PromiseFields
    }
  }
  ${PromiseFields}
`;

export const UPDATE_PROMISE = gql`
  mutation UpdatePromise($id: ID!, $input: UpdatePromiseInput!) {
    updatePromise(id: $id, input: $input) {
      ...PromiseFields
    }
  }
  ${PromiseFields}
`;