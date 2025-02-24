import { gql } from '@apollo/client';

export const CREATE_NEW_CUSTOMER = gql`
mutation CreateCustomer($input: CustomerInput!, $password: String!) {
    createCustomer(
        input: $input
        password: $password
    ) {
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
        address {
            street
            houseNumber
            zipCode
            city
            state
            country
        }
        contactOptions
        interests
    }
}
`;