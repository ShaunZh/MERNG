import { gql } from '@apollo/client';

export const USER_LOGIN= gql`
    mutation USER_LOGIN($username: String!, $password: String!) {
        login(username: $username, password: $password){
            username,
            token
        }
    }
`

export const USER_REGISTER= gql`
    mutation USER_REGISTER(
        $username: String!, 
        $password: String!, 
        $confirmPassword: String!
        $email: String!
        ) {
        register(registerInput: {
            username: $username, 
            password: $password
            confirmPassword: $confirmPassword
            email: $email
        }){
            username,
            token
        }
    }
`

