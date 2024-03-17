const checkAuth = require("../../util/check-auth")

const Post = require("../../models/Post");
const { GraphQLError } = require("graphql");

module.exports = {
    Mutation: {
        likePost: async (_, { postId }, context) => {
            const user = checkAuth(context);
            const post = await Post.findById(postId);

            if (post) {
                const index = post.likes.findIndex(like => like.username === user.username);
                let msg = ''
                if (index < 0) {
                    post.likes.push({
                        username: user.username,
                        createdAt: new Date().toISOString()
                    })
                    msg = 'Post liked'
                } else {
                    post.likes.splice(index, 1);
                    msg = 'Post unliked'
                }
                console.log('msg', post, msg)
                await post.save()
                return msg;
            } else {
                throw new GraphQLError('Post not found', {
                    extensions: ApolloServerErrorCode.BAD_USER_INPUT,
                })
            }
        }
    }
}