const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const pubsub = new PubSub();

module.exports.pubsub = pubsub;

const { MONGODB } = require('../config.js');
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers/index.js')

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});
const serverCleanup = useServer({
    schema,
}, wsServer);

const PORT = 5000

// Set up ApolloServer.
const server = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
    context: ({ req }) => ({ req, pubsub })
});

async function startApolloServer() {
    mongoose
        .connect(MONGODB, { useNewUrlParser: true })
        .then(async () => {
            console.log('MongoDB connected')
            await server.start();
            app.use(
                '/graphql',
                cors(),
                bodyParser.json(),
                expressMiddleware(server, {
                    context: async ({ req }) => ({ req, pubsub }),
                })
            );

            // Now that our HTTP server is fully set up, actually listen.
            return httpServer.listen(PORT)
        })
        .then(() => {
            console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
            console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
        })
}

startApolloServer();
