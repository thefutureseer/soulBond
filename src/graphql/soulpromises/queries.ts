import { gql } from '@apollo/client';
// import { CreatePromiseInput, UpdatePromiseInput} from 'types/graphql.d';
import { PromiseFields, SoulPromiseEditsLogFields } from './fragments';

export const GET_PROMISE = gql`
  query GetPromise($id: ID!, $offset: Int, $limit: Int) {
    getPromise(id: $id) {
      ...PromiseFields
      edits(offset: $offset, limit: $limit) {
        ...SoulPromiseEditsLogFields
      }
    }
  }
  ${PromiseFields}
  ${SoulPromiseEditsLogFields}
`;
