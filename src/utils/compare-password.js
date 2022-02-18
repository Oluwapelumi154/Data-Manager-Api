const bcrypt = require("bcrypt");
const comparePassword = async (userPassword, hashedPassword) => {
  return await bcrypt.compare(userPassword, hashedPassword);
};
module.exports = comparePassword;
