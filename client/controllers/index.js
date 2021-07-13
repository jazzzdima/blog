const express = require('express')
const app = express()
const request = require('request')
require('dotenv').config()
const { sendJsonResponse } = require('../../lib/helpers')

function indexPage(req, res) {
    const path = '/api/posts'
    const reqOptions = {
        url: `${process.env.SERVER}${path}`,
        method: 'GET',
        json: {}
    }
    request(reqOptions, (err, response, posts) => {
        if (err) {
            sendJsonResponse(res, 404, err.message)
            return
        }
        if (!posts) {
            sendJsonResponse(res, 404, 'Not posts found')
            return
        }
        res.render('index', { posts: posts })
    })

}

function postPage(req, res) {
    const path = '/api/post/'
    const reqOptions = {
        url: `${process.env.SERVER}${path}${req.params.postId}`,
        method: 'GET',
        json: {}
    }
    
    request(reqOptions, (err, response, post) => {
        if (err) {
            sendJsonResponse(res, 404, err.message)
            return
        }
        if (!post) {
            sendJsonResponse(res, 404, 'Not posts found')
            return
        }
        res.render('post', post)
    })
}

async function addComment(req, res) {
    const path = '/api/post/'
    const reqOptions = {
        url: `${process.env.SERVER}${path}${req.params.postId}/comment`,
        method: 'POST',
        form: {
            author: req.body.author,
            content: req.body.content
        }
    }
    
    request(reqOptions, (err, response, comment) => {
        if (err) {
            sendJsonResponse(res, 404, err.message)
            return
        }        
        if (!comment) {
            sendJsonResponse(res, 404, 'Comment not save')
            return
        }
        
        res.redirect( `${process.env.SERVER}/post/${req.params.postId}`)
    })
    
}

module.exports.indexPage = indexPage
module.exports.postPage = postPage
module.exports.addComment = addComment