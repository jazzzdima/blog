/*API routes for authors*/
const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors')

/*Get all authors*/
router.get('/authors', authorsController.getAuthors);

/*Get author by Id*/
router.get('/author/:authorId', authorsController.getAuthor);

/*Save new author*/
router.post('/author', authorsController.saveAuthor);

/*Update author by Id*/
router.put('/author/:authorId', authorsController.updateAuthor);

/*Delete author by Id*/
router.delete('/author/:authorId', authorsController.deleteAuthor);

module.exports = router;