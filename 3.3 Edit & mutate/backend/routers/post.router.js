const express = require('express')
const postController = require('../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const authorMiddleware = require('../middlewares/author.middleware')

const router=express.Router()

router.get("/get",postController.getAll)
router.post("/create",postController.createPost)  //authMiddleware
router.delete("/delete/:id",postController.deletePost) //authMiddleware,authorMiddleware
router.put("/edit/:id",postController.editedPost)  //authMiddleware,authorMiddleware
router.get("/get-one/:id",postController.getOne)

module.exports=router