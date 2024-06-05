const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      throw new Error(`User with existing email ${email}  already registered`);
    }

    const hashPassword=await bcrypt.hash(password,10)
    const user = await userModel.create({email,password:hashPassword})
    const userDto=new UserDto(user)
   //email service

    await mailService.sendMail(email,`${process.env.API_URL}/api/auth/activation/${userDto.id}`)

   //Jwt token generation 


    const tokens= tokenService.generateToken({...userDto})

    await tokenService.saveToken(userDto.id,tokens.refreshToken)


    // token
    return {user:userDto,...tokens}
  }
  async isActivation(userId){
const user=await userModel.findById(userId)
if(!user){
  throw new Error("User is not defined")
}
user.isActivate=true
await user.save()
  }
}

module.exports =new AuthService();
