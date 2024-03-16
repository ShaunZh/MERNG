module.exports = `#graphql
    type Post {
        id: ID!,
        post: String!,
        username: String!,
        createdAt: String!,
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
    }
`
