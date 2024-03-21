import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query ExampleQuery {
        getPosts {
            id
            post
            username
            commentCount
            likeCount
        }
    }
`

export const CREATE_POST = gql`
    mutation CREATE_POST($body: String!) {
      createPost(body: $body) {
        id,
        post
      }
    }
`