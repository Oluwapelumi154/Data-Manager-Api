const mongoose = require("mongoose");
const encrypt = require("../utils/crypt");

const { Schema } = mongoose;
const UserModel = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});
UserModel.set("toObject", { virtuals: true });
UserModel.set("toJSON", { virtuals: true });
UserModel.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

const user = mongoose.model("user", UserModel);

module.exports = user;
