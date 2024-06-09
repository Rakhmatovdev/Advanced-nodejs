const express = require('express')
const postController = require('../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const authorMiddleware = require('../middlewares/author.middleware')

const router=express.Router()

router.get("/get",postController.getAll)
router.post("/create",postController.createPost)
router.delete("/delete/:id",authMiddleware,authorMiddleware,postController.deletePost)
router.put("/edit/:id",authMiddleware,authorMiddleware,postController.editedPost)
router.get("/get-one/:id",postController.getOne)

module.exports=router