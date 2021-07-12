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

}

module.exports.indexPage = indexPage
module.exports.postPage = postPage