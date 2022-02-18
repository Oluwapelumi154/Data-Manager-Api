const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user-Controller");
const { createUser, AuthenticateUser, AuthUser } = require("../middlewares/Schema/schema");
const validate = require("../middlewares/Schema/index");
//userRouter.route("/").get(AuthController.getUsers);
userRouter.post("/register", createUser(), validate, userController.createUser);
userRouter.post("/login", AuthUser(), validate, userController.login);
//userRouter.route("/:userId").get(AuthController.getUserById).post(AuthController.updateUserById);
module.exports = userRouter;