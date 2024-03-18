const { GraphQLError } = require('graphql');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { ERROR_CODE } = require('../../constants');

const { pubsub } = require('../../index');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts
            } catch (err) {
                throw new Error(err)
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            const { pubsub } = context;

            const newPost = await Post.create({ 
                post: body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            })

            const post = await newPost.save() 
            pubsub.publish('POST_CREATED', { postCreated: post })
            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById( postId )
                if (user.username === post.username) {
                    await post.deleteOne();
                    return 'Post deleted successfully'
                } else {
                    throw new GraphQLError('Action not allowed ',  {
                        extensions: {
                            code: ERROR_CODE.UNAUTHENTICATED
                        }
                    })
                }
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Subscription: {
        postCreated: {
            subscribe: (_, __, context ) => {
                console.log('subscribe----', _, __, context)
                return pubsub.asyncIterator(['POST_CREATED'])
            }
        }
    }
    
}