const ApolloServerErrorCode = require('@apollo/server/errors');

const checkAuth = require("../../util/check-auth")

const Post = require("../../models/Post")

module.exports = {
    Mutation: {
        async createComment(_, { postId, body }, context) {
            const user = checkAuth(context);
            try {
                if (body.trim() === '') {
                    throw new GraphQLError('Comment body must not empty', {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        }
                    }) 
                }
                const post = await Post.findById(postId);
                if (post) {
                    const newComment = {
                        body,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    }
                    post.comments.unshift(newComment)
                    await post.save()
                    return post;
                } else {
                    throw new GraphQLError('Post not found', {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        }
                    })
                }
            } catch (err) {
                throw new Error(err);
            }

        },
        async deleteComment(_, { postId, commentId }, context) {
            const user = checkAuth(context); 

            try {
                const post = await Post.findById(postId);
                if (post) {
                    const index = post.comments.findIndex(comment => comment._id.toString() === commentId);
                    if (index !== -1) {
                        if (user.username !== post.comments[index].username) {
                            throw new GraphQLError('Action not allowed', {
                                extensions: {
                                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                                }
                            })
                        } else {
                            post.comments = post.comments
                                .filter(comment => comment._id.toString() !== commentId);
                            await post.save()
                            return 'Comment deleted successfully';
                        }
                    } else {
                        throw new GraphQLError('Comment not found', {
                            extensions: {
                                code: ApolloServerErrorCode.BAD_USER_INPUT,
                            }
                        })

                    }
                } else {
                    throw new GraphQLError('Post not found', {
                        extensions: {
                            code: ApolloServerErrorCode.BAD_USER_INPUT,
                        }
                    })
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}