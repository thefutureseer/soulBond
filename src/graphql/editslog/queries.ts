import { gql } from '@apollo/client';
import { EditsLogFields } from './fragments';

export const GET_EDITSLOG_WITH_THIS_ID = gql`
  query GetEditsLogForPromise($parentId: ID!, $offset: Int, $limit: Int) {
    getEditsLogForPromise(parentId: $parentId, offset: $offset, limit: $limit) {
      ...EditsLogFields
    }
  }
  ${EditsLogFields}
`;

export const GET_PROMISES = gql`
  query GetPromises {
    getPromises {
      ...EditsLogFields
    }
  }
  ${EditsLogFields}
`;