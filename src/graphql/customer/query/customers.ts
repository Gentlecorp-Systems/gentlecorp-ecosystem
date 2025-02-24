import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query Customers(
    $filter: [FilterInput]
    $pagination: PaginationInput
    $order: SortInput
) {
    customers(filter: { AND: $filter }, pagination: $pagination, order: $order) {
        id
        version
        lastName
        tierLevel
        username
        email
        customerState
        contactOptions
    }
}

`;


