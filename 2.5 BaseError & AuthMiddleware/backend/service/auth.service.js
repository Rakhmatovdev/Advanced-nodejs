const UserDto = require("../dtos/user.dto");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const tokenService = require("./token.service");
const mailService = require("./mail.service");
const BaseError = require("../errors/base.error");
class AuthService {
  async register(email, password) {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      throw BaseError.BadRequest(`User with existing email ${email}  already registered`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hashPassword });
    const userDto = new UserDto(user);
    //email service

    await mailService.sendMail(
      email,
      `${process.env.API_URL}/api/auth/activation/${userDto.id}`
    );

    //Jwt token generation

    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // token
    return { user: userDto, ...tokens };
  }
  async isActivation(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw BaseError.BadRequest("User is not defined");
    }
    user.isActivate = true;
    await user.save();
  }
  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw BaseError.BadRequest("User is not defined ");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw BaseError.BadRequest("Password is incorrect");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }
    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB) {
      throw BaseError.UnauthorizedError("Bad authorization");
    }

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }
  async getUsers(){
    return await userModel.find()
  }
}
module.exports = new AuthService();
