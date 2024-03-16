const Post = require('../../models/Post');

const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                console.log(posts)
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

            console.log('createPost')
            const newPost = await Post.create({ 
                post: body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            })

            const post = await newPost.save() 

            return post;
        },
        async deletePost(_, { postId }) {
            const errors = {}
            const post = await Post.findById( postId )
            if (post) {
                await post.delete();
            } else {
            }
        }
    }
    
}