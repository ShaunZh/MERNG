const checkAuth = require("../../util/check-auth")

const Post = require("../../models/Post")

module.exports = {
    Mutation: {
        likePost: async (_, { postId }, context) => {
            const user = checkAuth(context);
            const post = Post.findById(postId);
        }
    }
}