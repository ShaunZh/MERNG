const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const Post = require('./models/Post');

const typeDefs = gql`
    type Post {
        id: ID!,
        post: String!,
        username: String!,
        createdAt: String!,
    }
    type Query {
        getPosts: [Post]!
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                console.log(posts)
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected')
        return server.listen({ port: 5000 })
    })
    .then(() => {
        console.log('Server ready at port 5000')
    })
