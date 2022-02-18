const userRepo = require("../repository/user-repo");
const UserService = require("../services/user-services");
const { sessionResponsesMessage, errorMessage } = require("../utils/responses");
const { verifyJWT } = require("../utils/token");
const User = new UserService();
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const { statusCode, message, data } = user;
    if (statusCode !== 201) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};
/*exports.login = async (req, res, next) => {
  console.log(req.body);
}*/
exports.login = async (req, res, next) => {
  try {
    const isAuthenticated = await User.Authenticate(req.body);
    const { statusCode, message, data } = isAuthenticated;
    if (statusCode != 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server Error");
  }
};
exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("x-access-token");
    if (!token) return errorMessage(res, "403", "UnAuthorized User !login to gain Access");
    const decoded = await verifyJWT(token);
    if (!decoded) return errorMessage(res, 401, "Session Expired");
    const user = await userRepo.findById(decoded._id);
    if (!user) return errorMessage(res, 401, "UnAuthorized User !Login to gain access");
    req.user = user;
    next();
  } catch (err) {
    return errorMessage(res, 500, err.message);
  }
};
