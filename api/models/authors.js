const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({    
    name: {
        first: {
            type: String,
            required: true,
            max: 256
        },
        last: {
            type: String,
            required: true,
            max: 256
        }
    },
    image: {
        url: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        max: 256
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 256
    }
})

let Author = mongoose.model('Author', authorSchema)

module.exports = Author