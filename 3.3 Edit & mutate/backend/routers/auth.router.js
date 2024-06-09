const express = require('express')
const authController = require('../controllers/auth.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

const router=express.Router()

router.post("/register",body("email").isEmail(),body("password").isLength({min:3,max:30}),authController.register)
router.get("/activation/:id",authController.isActivation)
router.post("/login",body("email").isEmail(),body("password").isLength({min:3,max:30}),authController.login)
router.post("/logout",authController.logout)
router.get("/refresh",authController.refresh)

//private router
router.get("/get-users",authMiddleware,authController.getUser)



module.exports=router