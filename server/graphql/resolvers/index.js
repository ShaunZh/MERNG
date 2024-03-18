const postsResolvers = require('./posts.js')
const usersResolvers = require('./users.js')
const commentResolvers = require('./comments.js')
const likeResolvers = require('./likes.js')

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },
    Query: {
        ...postsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    }
}
