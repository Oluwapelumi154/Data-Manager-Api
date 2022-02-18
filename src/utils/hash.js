const bcrypt = require("bcrypt");
const hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword, "Heash");
  return hashedPassword;
};
module.exports = hash;
