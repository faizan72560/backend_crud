const express = require("express")

const { addPost, getPost, deletePost, updatePost } = require("../controller/postController")

const router = express.Router()

router.route('/items').post(addPost)
router.route('/items').get(getPost)
router.route('/items/:id').delete(deletePost)
router.route('/items/:id').put(updatePost)






module.exports = router