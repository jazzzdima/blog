const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    published: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": null
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    replies: {
        count: {
            type: Number,
            "default": 0
        },
        selfLink: {
            type: String
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post