module.exports = `#graphql
    type Post {
        id: ID!,
        post: String!,
        username: String!,
        createdAt: String!,
        comments: [Comment]!,
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
    type Query {
        getPosts: [Post]!
        getPost(postId: ID!): Post!
    }

    type User {
        id: ID!,
        token: String!
        username: String!
        email: String!
        createdAt: String!
    }

    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!

        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): String!
        likePost(postId: ID!): String!
    }
    type Subscription {
        postCreated: Post!
    }
`
