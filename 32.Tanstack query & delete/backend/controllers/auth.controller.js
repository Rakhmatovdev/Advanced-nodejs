const { validationResult } = require("express-validator");
const authService = require("../service/auth.service");
const AuthService = require("../service/auth.service");
const BaseError = require("../errors/base.error");

class AuthController{
    async register(req,res,next){
     try {
      const errors=validationResult(req)
      if(!errors.isEmpty()){
         return next(BaseError.BadRequest("Error with validation",errors.array()))
      }
   
   const  {email,password} = req.body
   const data= await AuthService.register(email,password)
   res.cookie("refreshToken",data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true})
   return res.json(data)
     } catch (error) {
        next(error)
     }
     next()
    }
    async isActivation(req,res,next){
     try {
        const userId=req.params.id
        await authService.isActivation(userId)
      return res.redirect(process.env.CLIENT_URL)
     } catch (error) {
        next(error)
     }
   }
   async login(req,res,next){
      try {
   const {email,password}=req.body
   const data=await authService.login(email,password)
   res.cookie("refreshToken",data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000})
   return res.json(data)      
} catch (error) {
         next(error)
      }
   }
   async logout(req,res,next){
      try {
         const {refreshToken}=req.cookies
        const token= await authService.logout(refreshToken)
         res.clearCookie("refreshToken")
         res.status(200).json({token})
      } catch (error) {
         next(error)
      }

   }
   async refresh(req,res,next){
      try {
        const {refreshToken}=req.cookies 
        const data= await authService.refresh(refreshToken)
        res.cookie("refreshToken",data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true})
        return res.json(data)
      } catch (error) {
         next(error)
      }
   }
   async getUser(req,res,next){
    try {
      const data=await authService.getUsers()
      res.json(data)
    } catch (error) {
      next(error)
    }
   }
}

module.exports= new AuthController()


//    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJha2htYXRvdmphc3VyYmVrM0BnbWFpbC5jb20iLCJpZCI6IjY2NWVhMGRmMmViY2Q0OGUxMjA4OTA3MiIsImlzQWN0aXZhdGUiOnRydWUsImlhdCI6MTcxNzQ4Mjk0OSwiZXhwIjoxNzE3NDgzODQ5fQ.tJkoItAYqhUJEwyHRhblZW9qAyZOivcmx2kl6tqAhOI",
//    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJha2htYXRvdmphc3VyYmVrM0BnbWFpbC5jb20iLCJpZCI6IjY2NWVhMGRmMmViY2Q0OGUxMjA4OTA3MiIsImlzQWN0aXZhdGUiOnRydWUsImlhdCI6MTcxNzQ4MzEyNywiZXhwIjoxNzE3NDg0MDI3fQ.s0-KweZ10s-VmEzzvcqdjued2A7OUuSxDSBnJRnd-Nk",
