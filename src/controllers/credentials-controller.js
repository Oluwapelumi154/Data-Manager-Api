const OrgCredentialService = require("../services/credentials-service");
const { errorMessage, successMessage, sessionResponsesMessage } = require("../utils/responses");
const Credentials = new OrgCredentialService();

exports.createCredentials = async (req, res) => {
  try {
    const newCredentials = await Credentials.create(req.body);
    const { statusCode, message, data } = newCredentials;
    if (statusCode !== 201) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal Server Error");
  }
};
exports.getCreds = async (req, res, next) => {
  try {
    const credentials = await Credentials.find();
    const { statusCode, message, data } = credentials;
    console.log(statusCode, message, data);
    if (statusCode !== 200) return errMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal Server Errorss");
  }
};

exports.getCredById = async (req, res) => {
  try {
    const credentials = await Credentials.findById(req.params.credId);
    const { statusCode, message, data } = credentials;
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};

exports.updateCredById = async (req, res, next) => {
  try {
    const credentials = await Credentials.update(req.params.credId, req.body);
    const { statusCode, message, data } = credentials;
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};

exports.deleteCredById = async (req, res) => {
  try {
    const org = await Credentials.delete(req.params.credId);
    const { statusCode, message } = org;
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return successMessage(res, statusCode, message);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};
