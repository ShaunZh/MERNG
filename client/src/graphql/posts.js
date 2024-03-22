import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
    query GetPosts {
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

// export const POSTS_SUBSCRIPTION = gql`
//   subscription POSTS_SUBSCRIPTION() {
//     POST_CREATED() {
//       id
//       content
//     }
//   }
// `;

export const NEW_SUBSCRIPTION = gql`
subscription Subscription {
  postCreated {
    id
    post
    username
    createdAt
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    likeCount
    commentCount
  }
}
`