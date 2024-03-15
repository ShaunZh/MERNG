const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    post: String,
    username: String,
    createdAt: String,
    comments: [{
        post: String,
        username: String,
        createdAt: String,
    }],
    likes: [{
        username: String,
        createdAt: String,
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Post', postSchema)