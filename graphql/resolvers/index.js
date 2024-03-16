const postsResolvers = require('./posts.js')
const usersResolvers = require('./users.js')
const commentResolvers = require('./comments.js')

module.exports = {
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation,
    }
}
