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

export const CREAT_POST = gql`
    mutation CreatePost($body: String!) {
      createPost(body: $body) {
        id,
        post
      }
    }
`