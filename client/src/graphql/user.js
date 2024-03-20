import { gql } from '@apollo/client';

export const USER_LOGIN= gql`
    mutation USER_LOGIN {
        login(username, password){
            username,
            token
        }
    }
`
