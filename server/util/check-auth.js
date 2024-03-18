const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql')

const { SECRET_KEY } = require('../../config');
const { ERROR_CODE } = require('../constants');

module.exports = (context) => {
    // get authentication
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
                        code: ERROR_CODE.UNAUTHENTICATED
                    }
                })
            }
        }
        throw new GraphQLError('Authentication token must be "Bearer [token]"', {
            extensions: {
                code: ERROR_CODE.UNAUTHENTICATED
            }
        })
    }
    throw new GraphQLError('Authentication header must be provided', {
        extensions: {
            code: ERROR_CODE.UNAUTHENTICATED
        }
    })
}