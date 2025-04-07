import { gql } from '@apollo/client';

export const EditsLogFields = gql`
  fragment EditsLogFields on EditsLog {
    id
    changes
    version
    parentId
    createdAt
    editedBy {
      id
      name
    }
  }
`;