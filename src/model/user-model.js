const mongoose = require("mongoose");
const encrypt = require("../utils/crypt");
const { Schema } = mongoose;

const encryptUser = (user) => {
  user.firstName = encrypt(user.firstName);
  user.lastName = encrypt(user.lastName);
  user.email = encrypt(user.email);
  user.password = encrypt(user.password);
  return user;
};

const decryptUser = (user) => {
  user.firstName = decrypt(user.firstName);
  user.lastName = decrypt(user.lastName);
  user.email = decrypt(user.email);
  user.password = decrypt(user.password);
  return user;
};
const UserModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});
UserModel.set("toObject", { virtuals: true });
UserModel.set("toJSON", { virtuals: true });
UserModel.virtual("fullName").get(function () {
  return `${this.firstName}  ${this.lastName}`;
});
UserModel.pre("save", function (next) {
  const encrypted = encryptUser(this);
  return encrypted;
});
UserModel.post("save", function (users, next) {
  const decrypted = decryptUser(users);
  return decrypted;
});
UserModel.post("/^find/", function (result) {});
const user = mongoose.model("user", UserModel);

module.exports = user;
