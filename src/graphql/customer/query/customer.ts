import { gql } from '@apollo/client';

export const GET_CUSTOMER_BY_ID = gql`
query Customer($id: ID!) {
    customer(id: $id) {
        id
        version
        lastName
        firstName
        email
        phoneNumber
        username
        tierLevel
        subscribed
        birthdate
        gender
        maritalStatus
        customerState
        contactOptions
        interests
        address {
            street
            houseNumber
            zipCode
            city
            state
            country
        }
        contactIds
    }
}
`;