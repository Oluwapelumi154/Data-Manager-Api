const OrganizationService = require("../services/organization-service");
const { errorMessage, successMessage, sessionResponsesMessage } = require("../utils/responses");
const Organization = new OrganizationService();

exports.createOrg = async (req, res, next) => {
  try {
    const newOrg = await Organization.create(req.body);
    const { statusCode, message, data } = newOrg;
    if (statusCode != 201) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal Server Error");
  }
};

exports.getOrgs = async (req, res, next) => {
  try {
    const organizations = await Organization.find();
    const { statusCode, message, data } = organizations;
    if (statusCode !== 200) return errMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal Server Errorss");
  }
};

exports.getOrgById = async (req, res) => {
  try {
    const organizations = await Organization.findById(req.params.orgId);
    const { statusCode, message, data } = organizations;
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};

exports.updateOrgId = async (req, res, next) => {
  try {
    const updatedOrg = await Organization.update(req.params.orgId, req.body);
    const { statusCode, message, data } = updatedOrg;
    console.log(data);
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};

exports.deleteOrgById = async (req, res) => {
  try {
    const org = await Organization.delete(req.params.orgId);
    const { statusCode, message, data } = org;
    if (statusCode !== 200) return errorMessage(res, statusCode, message);
    return sessionResponsesMessage(res, statusCode, message, data);
  } catch (err) {
    return errorMessage(res, 500, "Internal server error");
  }
};
