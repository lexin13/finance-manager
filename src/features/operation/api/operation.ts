import { gql } from '@apollo/client';

export const OPERATION_LIST_QUERY = gql`
  query Operations {
    operations {
      getMany {
        data {
          ... on Profit {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            category {
              name
            }
            type
          }
          ... on Cost {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            category {
              name
            }
            type
          }
        }
      }
    }
  }
`;

export const ADD_OPERATION_MUTATION = gql`
mutation Operations($input: OperationAddInput!) {
  operations {
    add(input: $input) {
      ... on Cost {
        id
        amount
        category {
          name
          id
        }
        createdAt
        date
        desc
        name
        type
        updatedAt
      }
    }
  }
}
`;
