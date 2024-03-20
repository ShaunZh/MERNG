import { gql } from '@apollo/client';

export const USER_LOGIN= gql`
    mutation USER_LOGIN($username: String!, $password: String!) {
        login(username: $username, password: $password){
            username,
            token
        }
    }
`
