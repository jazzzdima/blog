const express = require('express')
const router = express.Router()

const clientController = require('../controllers/index')

router.get('/', clientController.indexPage)
router.get('/post/:postId', clientController.postPage)
router.post('/post/:postId/comment', clientController.addComment)

module.exports = router