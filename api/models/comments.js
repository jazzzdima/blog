const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({    
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    published: {
        type: Date,
        "default": Date.now
    },
    updated: {
        type: Date,
        "default": null
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        "default": false
    }
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment