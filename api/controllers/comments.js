const mongoose = require('mongoose')
const Comment = require('../models/comments')
const Post = require('../models/posts')
const { sendJsonResponse } = require('../lib/helpers')

async function getComments(req, res) {
    try {
        let comments = await Comment.find({})
        if (comments.length < 1) {
            sendJsonResponse(res, 404, 'Not comments found')
            return
        } else {
            sendJsonResponse(res, 200, comments)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }
}

async function getCommentsByPostId(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }
    try {
        let comments = await Comment.find({post : req.params.postId})
        if (comments.length < 1) {
            sendJsonResponse(res, 404, 'Not comments found for post')
            return
        } else {
            sendJsonResponse(res, 200, comments)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {'message' : err.message})
        return
    }
}

async function getCommentById(req, res) {
    if (!req.params.commentId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }

    try {
        let comment = await Comment.findById(req.params.commentId)
        if (comment === null) {
            sendJsonResponse(res, 404, {'message': 'Not comment found'})
            return
        } else {
            sendJsonResponse(res, 200, comment)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {'message' : err.message})
        return
    }
}

async function saveComment(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Empty id for post'})
        return
    }

    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }

    let comment = new Comment({
        content: req.body.content,
        author: req.body.author,
        post: req.params.postId
    })
    
    try {
        await comment.save(comment)
        sendJsonResponse(res, 201, {'type' : 'save', 'comment' : comment})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

async function updateComment(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught post id'})
        return
    }
    if (!req.params.commentId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught comment id'})
        return
    }
    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }
    
    let comment = await Comment.findById(req.params.commentId)
    comment.content = req.body.content ?? comment.content
    comment.active = req.body.active ?? comment.active
    comment.updated = Date.now()
    
    try {
        await comment.save()
        sendJsonResponse(res, 201, {'type' : 'update', 'comment' : comment})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

async function deleteComment(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught post Id'})
        return
    }
    if (!req.params.commentId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught comment Id'})
        return
    }
    
    try {
        let comment = await Comment.findById(req.params.commentId)
        await Comment.deleteOne({ _id: comment._id })
        sendJsonResponse(res, 410, {'type' : 'delete', 'comment' : comment})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    } 
}

async function deleteCommentsByPostId(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught post Id'})
        return
    }

    try {
        let post = await Post.findById(req.params.postId)
        if (!post) {
            sendJsonResponse(res, 404, {'message' : 'Post not find'})
            return 
        }
        let deletedComments = await Comment.find({ post: post._id })
        await Comment.deleteMany({ post: post._id })
        sendJsonResponse(res, 
            410, 
            {'type' : 'deleteAllByPost', 'comments' : deletedComments}
        )
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

module.exports.getComments = getComments
module.exports.getCommentsByPostId = getCommentsByPostId
module.exports.getCommentById = getCommentById
module.exports.saveComment = saveComment
module.exports.updateComment = updateComment
module.exports.deleteComment = deleteComment
module.exports.deleteCommentsByPostId = deleteCommentsByPostId