import { gql } from '@apollo/client';

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