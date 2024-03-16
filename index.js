const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers/index.js')

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(async () => {
        console.log('MongoDB connected')
        const app = await startStandaloneServer(server, {
            listen: { port: 5000 },
            context: async ({ req }) => ({ req }),
        })
        return app
    })
    .then(() => {
        console.log('Server ready at port 5000')
    })
