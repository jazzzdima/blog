/*API routes for posts*/
var express = require('express');
var router = express.Router();
const postsController = require('../controllers/posts')

/*Get all posts*/
router.get('/posts', postsController.getAllPosts);

/*Get all posts by author*/
router.get('/posts/author/:authorId', postsController.getAllPostsByAuthor);

/*Get post by Id*/
router.get('/post/:postId', postsController.getPostById);

/*Save new post*/
router.post('/post', postsController.savePost);

/*Update post by Id*/
router.put('/post/:postId', postsController.updatePost);

/*Delete post by Id*/
router.delete('/post/:postId', postsController.deletePost);

/*Delete all posts by author*/
router.delete('/posts/author/:authorId', postsController.deleteAllPostsByAuthor);

module.exports = router;