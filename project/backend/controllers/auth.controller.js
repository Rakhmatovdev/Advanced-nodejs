const authService = require("../service/auth.service");
const AuthService = require("../service/auth.service");

class AuthController{
    async register(req,res,next){
     try {
   const  {email,password} = req.body
   const data= await AuthService.register(email,password)
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
        res.json({message:"User activated "})
     } catch (error) {
        console.log(error);
     }
    }
}

module.exports= new AuthController()