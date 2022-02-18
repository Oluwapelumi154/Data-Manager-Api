const { body, param } = require("express-validator");
module.exports = {
  createUser: () => [
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("lastName").notEmpty().withMessage("lastName is required"),
    body("email").isEmail().withMessage("Invalid Email Address").notEmpty().withMessage("Email is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 Characters Long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .withMessage("Must contain  an uppercase, symbol and a letter"),
  ],

  AuthUser: () => [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 characters long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
      .withMessage("Must consist of an uppercase,lowercase, digit and a character"),
  ],

  createCredential: () => [
    body("username").notEmpty().withMessage("username is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("IpAddress")
      .notEmpty()
      .withMessage("IpAddress is required")
      .matches("^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")
      .withMessage("A valid IpAddress is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("orgId").notEmpty().withMessage("A valid id is required").isMongoId().withMessage("A valid Id is required"),
  ],
  createOrg: () => [body("name").notEmpty().withMessage("name is required")],
  orgId: () => [param("orgId").isMongoId().withMessage("It is not a valid id")],
  userId: () => [param("userId").isMongoId().withMessage("This not a valid Id")],
  credId: () => [param("credId").isMongoId().withMessage("It is not a valid Id")],
};
