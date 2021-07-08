const mongoose = require('mongoose')
//const readline = require('readline')

let connectionDBString

process.env.NODE_ENV === 'production' ?
    connectionDBString = process.env.MONGODB_PROD_URI :
    connectionDBString = process.env.MONGODB_DEV_URI

mongoose.connect(
    connectionDBString, 
    {
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection is open')
    }).on('error', err => {
        console.log(`Mongoose connection error ${err.message}`)
    }).on('disconnected', () => {
        console.log('Mongoose disconnected')
    })