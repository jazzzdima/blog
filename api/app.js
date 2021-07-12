var express = require('express');
var app = express();
require('./models/db')

//API routes
const apiPostsRouter = require('./routes/posts')
const apiCommentsRouter = require('./routes/comments')
const apiAuthorsRouter = require('./routes/authors')

app.use('/api', apiPostsRouter);
app.use('/api', apiCommentsRouter);
app.use('/api', apiAuthorsRouter);

module.exports = app