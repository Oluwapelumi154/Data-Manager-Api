const jwt = require("jsonwebtoken");
const { promisify } = require("util");
exports.signJWT = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TIME,
  });
};

exports.verifyJWT = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
};
