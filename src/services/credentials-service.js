const organizationCredRepo = require("../repository/credentials-repo");
const { serviceResponse } = require("../utils/responses");

class OrgCredentialService {
  async create(OrgToCreate) {
    try {
      const existedOrg = await organizationCredRepo.findByName(OrgToCreate.userame);
      if (existedOrg) return serviceResponse(409, "An Organization Already this name");
      const newOrg = await organizationCredRepo.create(OrgToCreate);
      return serviceResponse(201, "Organinzation Created SuccessFully", { newOrg });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async find() {
    try {
      const Orgs = await organizationCredRepo.find();
      return serviceResponse(200, "Successfully Fetched Organization", { Orgs });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async findById(credId) {
    try {
      const org = await organizationCredRepo.findById(credId);
      if (!org) return serviceResponse(400, "Invalid Id");
      return serviceResponse(200, "fetched Successfully", { org });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async update(credId, credToUpdate) {
    try {
      const existedOrg = await organizationCredRepo.findById(credId);
      if (!existedOrg) return serviceResponse(400, "Invalid Id");
      const updatedInfo = await organizationCredRepo.updateById(credId, credToUpdate);
      return serviceResponse(200, "Successfully Upadted User", { updatedInfo });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async delete(credId) {
    try {
      const existedOrg = await organizationCredRepo.findById(credId);
      if (!existedOrg) return serviceResponse(400, "Invalid Id");
      const org = await organizationCredRepo.deleteById(credId);
      if (!org) return serviceResponse(400, "Invalid Id");
      return serviceResponse(200, "Successfully Deleted User");
    } catch (err) {
      return serviceResponse(500, "Internal Server Errors", err.message);
    }
  }
}
module.exports = OrgCredentialService;
