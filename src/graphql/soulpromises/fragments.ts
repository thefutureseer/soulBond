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
    parentId
  }
`;

export const EditsLogFields = gql`
  fragment EditsLogFields on EditsLog {
    id
    title
    description
    status
    createdById
    version
    parentId
    changes
    createdAt
    editedBy {
      id
      name
    }
  }
`;