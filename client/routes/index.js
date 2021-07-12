const express = require('express')
const router = express.Router()

const clientController = require('../controllers/index')

/*router.get('/', (req, res) => {
    let indexPageData = clientController.indexPage()
    res.render('index', indexPageData)
})*/
router.get('/', clientController.indexPage)

router.get('/post/:postId', clientController.postPage)

module.exports = router