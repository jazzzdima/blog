const mongoose = require('mongoose')
const Post = require('../models/posts')
const Author = require('../models/authors')
const { sendJsonResponse } = require('../lib/helpers')

async function getAllPosts(req, res) {
    try {
        let posts = await Post.find({})
        if (posts.length < 1) {
            sendJsonResponse(res, 404, 'Not posts found')
            return
        } else {
            sendJsonResponse(res, 200, posts)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }
}

async function getActivePosts(req, res) {
    try {
        let posts = await Post.find({ active: true })
        if (posts.length < 1) {
            sendJsonResponse(res, 404, 'Not active posts found')
            return
        } else {
            sendJsonResponse(res, 200, posts)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }
}

async function getNoActivePosts(req, res) {
    try {
        let posts = await Post.find({ active: false })
        if (posts.length < 1) {
            sendJsonResponse(res, 404, 'Not no active posts found')
            return
        } else {
            sendJsonResponse(res, 200, posts)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }
}

async function getAllPostsByAuthor(req, res) {
    if (!req.params.authorId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }
    try {
        let posts = await Post.find({author : req.params.authorId})
        if (posts.length < 1) {
            sendJsonResponse(res, 404, 'Not posts found by author')
            return
        } else {
            sendJsonResponse(res, 200, posts)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {'message' : err.message})
        return
    }
}

async function getPostById(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }

    try {
        let post = await Post.findById(req.params.postId)
        if (post === null) {
            sendJsonResponse(res, 404, {'message': 'Not post found'})
            return
        } else {
            sendJsonResponse(res, 200, post)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {'message' : err.message})
        return
    }
}

async function savePost(req, res) {
    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }

    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        email: req.body.email,
        author: req.body.author
    })
    
    try {
        await post.save(post)
        sendJsonResponse(res, 201, {'type' : 'save', 'post' : post})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

async function updatePost(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught post id'})
        return
    }
    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }
    
    let post = await Post.findById(req.params.postId)
    post.title = req.body.title ?? post.title
    post.content = req.body.content ?? post.content
    post.updated = Date.now()
    
    try {
        await post.save()
        sendJsonResponse(res, 201, {'type' : 'update', 'post' : post})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

async function deletePost(req, res) {
    if (!req.params.postId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }
    
    try {
        let post = await Post.findById(req.params.postId)
        await Post.deleteOne({ _id: post._id })
        sendJsonResponse(res, 410, {'type' : 'delete', 'post' : post})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    } 
}

async function deleteAllPostsByAuthor(req, res) {
    if (!req.params.authorId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught author Id'})
        return
    }

    try {
        let author = await Author.findById(req.params.authorId)
        if (!author) {
            sendJsonResponse(res, 404, {'message' : 'Author not find'})
            return 
        }
        let deletedPosts = await Post.find({ author: author._id })
        await Post.deleteMany({ author: author._id })
        sendJsonResponse(res, 
            410, 
            {'type' : 'deleteAllByAuthor', 'posts' : deletedPosts}
        )
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

module.exports.getAllPosts = getAllPosts
module.exports.getActivePosts = getActivePosts
module.exports.getNoActivePosts = getNoActivePosts
module.exports.getAllPostsByAuthor = getAllPostsByAuthor
module.exports.getPostById = getPostById
module.exports.savePost = savePost
module.exports.updatePost = updatePost
module.exports.deletePost = deletePost
module.exports.deleteAllPostsByAuthor = deleteAllPostsByAuthor