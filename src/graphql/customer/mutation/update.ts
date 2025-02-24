import { gql } from '@apollo/client';

export const UPDATE_CUSTOMER_BY_ID = gql`
mutation UpdateCustomer ($id: ID!, $input: CustomerUpdateInput!, $version: Int!) {
    updateCustomer(
        input: $input
        id: $id
        version: $version
    ) {
        message
    }
}

`;