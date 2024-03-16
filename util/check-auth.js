const jwt = require('jsonwebtoken');
const { ApolloServerErrorCode } = require('@apollo/server/errors')
const { GraphQLError } = require('graphql')

const { SECRET_KEY } = require('../config');

module.exports = (context) => {
    // get authentication
    console.log('context', context.req.headers)
    const authHeader = context.req.headers.authorization

    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, SECRET_KEY);
                return user;
            } catch (err) {
                throw new GraphQLError('Invalid/Expired token: ' + err.message, {
                    extensions: {
                        code: ApolloServerErrorCode.UNAUTHENTICATED,
                    }
                })
            }
        }
        throw new GraphQLError('Authentication token must be "Bearer [token]"', {
            extensions: {
                code: ApolloServerErrorCode.UNAUTHENTICATED
            }
        })
    }
    throw new GraphQLError('Authentication header must be provided', {
        extensions: {
            code: ApolloServerErrorCode.UNAUTHENTICATED
        }
    })
}