const mongoose = require('mongoose')
const Author = require('../models/authors')
const { sendJsonResponse } = require('../lib/helpers')

async function getAuthors(req, res) {
    try {
        let authors = await Author.find({})
        if (authors.length < 1) {
            sendJsonResponse(res, 404, 'Not authors found')
            return
        } else {
            sendJsonResponse(res, 200, authors)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }    
}

async function getAuthor(req, res) {
    if (!req.params.authorId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }
    
    try {
        let author = await Author.findById(req.params.authorId)
        if (author === null) {
            sendJsonResponse(res, 404, {'message': 'Not author found'})
            return
        } else {
            sendJsonResponse(res, 200, author)
        }
    } catch (err) {
        sendJsonResponse(res, 404, {"message" : err.message})
        return
    }
}

async function saveAuthor(req, res) {
    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }
    
    let author = new Author({
        name: {
            first: req.body.name_first,
            last: req.body.name_last
        },
        image: {
            url: req.body.image_url
        },
        email: req.body.email,
        password: req.body.password
    })
    
    try {
        await author.save(author)
        sendJsonResponse(res, 201, {'type' : 'save', 'author' : author})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }
}

async function updateAuthor(req, res) {
    if (!req.params.authorId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught author ie'})
        return
    }

    if (!req.body) {
        sendJsonResponse(res, 404, {'message' : 'Empty request body'})
        return
    }
    
    let author = await Author.findById(req.params.authorId)
    author.name.first = req.body.name_first ?? author.name.first
    author.name.last = req.body.name_last ?? author.name.last
    author.image.url = req.body.image_url ?? author.image.url
    author.email = req.body.email ?? author.email
    author.password = req.body.password ?? author.password
    
    try {
        await author.save()
        sendJsonResponse(res, 201, {'type' : 'update', 'author' : author})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }    
}

async function deleteAuthor(req, res) {
    if (!req.params.authorId) {
        sendJsonResponse(res, 404, {'message' : 'Not enaught parameter Id'})
        return
    }
    
    try {
        let author = await Author.findById(req.params.authorId)
        await Author.deleteOne({ _id: author._id })
        sendJsonResponse(res, 410, {'type' : 'delete', 'author' : author})
    } catch (err) {
        sendJsonResponse(res, 400, {'message' : err.message})
    }    
}

module.exports.getAuthors = getAuthors
module.exports.getAuthor = getAuthor
module.exports.saveAuthor = saveAuthor
module.exports.updateAuthor = updateAuthor
module.exports.deleteAuthor = deleteAuthor