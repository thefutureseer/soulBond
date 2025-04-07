import { gql } from '@apollo/client';

export const PromiseFields = gql`
  fragment PromiseFields on SoulPromise {
    id
    title
    description
    createdById
    version
    createdAt
    updatedAt
    status}
`;

export const SoulPromiseEditsLogFields = gql`
  fragment SoulPromiseEditsLogFields on EditsLog {
    id
    title
    description
    status
    createdById
    version
    createdAt
    editedBy {
      id
      name
    }
  }
`;