/*API routes for comments*/
var express = require('express');
var router = express.Router();
const commentsController = require('../controllers/comments')

/*Get all comments*/
router.get('/posts/comments', commentsController.getComments);

/*Get all comments for post*/
router.get('/post/:postId/comments', commentsController.getCommentsByPostId);

/*Get comment by id for post*/
router.get('/post/:postId/comment/:commentId', commentsController.getCommentById);

/*Save new comment*/
router.post('/post/:postId/comment', commentsController.saveComment);

/*Update comment by Id*/
router.put('/post/:postId/comment/:commentId', commentsController.updateComment);

/*Delete comment by Id*/
router.delete('/post/:postId/comment/:commentId', commentsController.deleteComment);

/*Delete all comment by post Id*/
router.delete('/post/:postId/comments', commentsController.deleteCommentsByPostId);

module.exports = router;