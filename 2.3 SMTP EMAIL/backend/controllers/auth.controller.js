const authService = require("../service/auth.service");
const AuthService = require("../service/auth.service");

class AuthController{
    async register(req,res,next){
     try {
   const  {email,password} = req.body
   const data= await AuthService.register(email,password)
   res.cookie("refreshToken",data.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true})
   return res.json(data)
     } catch (error) {
        console.log(error);
     }
     next()
    }
    async isActivation(req,res,next){
     try {
        const userId=req.params.id
        await authService.isActivation(userId)
      return res.redirect("https://sammi.ac")
     } catch (error) {
        console.log(error);
     }
    }
}

module.exports= new AuthController()