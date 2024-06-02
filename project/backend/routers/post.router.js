const express = require('express')
const postController = require('../controllers/post.controller')

const router=express.Router()

router.get("/get",postController.getAll)
router.get("/get-one/:id",postController.getOne)
router.post("/create",postController.createPost)
router.delete("/delete/:id",postController.deletePost)
router.put("/edit/:id",postController.editedPost)

module.exports=router