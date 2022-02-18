const userRepo = require("../repository/user-repo");
const hash = require("../utils/hash");
const { serviceResponse, errorMessage } = require("../utils/responses");
const { signJWT } = require("../utils/token");
const comparePassword = require("../utils/compare-password");
const encrypt = require("../utils/crypt");
class UserService {
  async create(userToCreate) {
    try {
      const existedUser = await userRepo.findByEmail(userToCreate.email);
      if (existedUser) return serviceResponse(409, "User Already Exist");
      const password = await hash(userToCreate.password);
      const encrypted = encrypt(userToCreate.email);
      console.log(encrypted, "Encrypted");
      const user = { ...userToCreate, password };
      const newUser = await userRepo.create(user);
      const token = signJWT(newUser);
      return serviceResponse(201, "Registered Successfully", { newUser, token });
    } catch (err) {
      console.log(err);
      return serviceResponse(500, "Internal server Error", err);
    }
  }
  async Authenticate(userToLogin) {
    try {
      const user = await userRepo.findByEmail(userToLogin.email);
      if (!user) return serviceResponse(401, "Incorrect Email or Password");
      const checkPassword = await comparePassword(userToLogin.password, user.password);
      if (!checkPassword) return serviceResponse(401, "Incorrect Email or Password");
      const token = signJWT(user);
      return serviceResponse(200, "Login Successfully", { user, token });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }
}

module.exports = UserService;
