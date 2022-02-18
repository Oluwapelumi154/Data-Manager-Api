const express = require("express");
const credentialsController = require("../controllers/credentials-controller");
const validate = require("../middlewares/Schema/index");
const credentialsRouter = express.Router();
const { createCredential, credId } = require("../middlewares/Schema/schema");
credentialsRouter.post("/register", createCredential(), validate, credentialsController.createCredentials);
credentialsRouter.get("/", credentialsController.getCreds);
credentialsRouter.get("/:credId", credId(), validate, credentialsController.getCredById);
credentialsRouter.patch("/:credId", credId(), validate, credentialsController.updateCredById);
credentialsRouter.delete("/:credId", credId(), validate, credentialsController.deleteCredById);

module.exports = credentialsRouter;
