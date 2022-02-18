const organizationRepo = require("../repository/organization-repo");
const { serviceResponse } = require("../utils/responses");
class OrganizationService {
  async create(OrgToCreate) {
    try {
      const existedOrg = await organizationRepo.findByName(OrgToCreate.name);
      if (existedOrg) return serviceResponse(400, "An Organization Exist with this name");
      const newOrg = await organizationRepo.create(OrgToCreate);
      return serviceResponse(201, "Created Successfully", { newOrg });
    } catch (err) {
      return serviceResponse(500, "Internals Server Error", err.message);
    }
  }

  async find() {
    try {
      const Orgs = await organizationRepo.find();
      return serviceResponse(200, "Successfully Fetched Organization", { Orgs });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async findById(orgId) {
    try {
      const org = await organizationRepo.findById(orgId);
      if (!org) return serviceResponse(400, "Invalid Id");
      return serviceResponse(200, "fetched Successfully", { org });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async update(orgId, orgToUpdate) {
    try {
      const existedOrg = await organizationRepo.findById(orgId);
      if (!existedOrg) return serviceResponse(400, "Invalid Id");
      const updatedInfo = await organizationRepo.updateById(orgId, orgToUpdate);
      return serviceResponse(200, "Successfully Upadted User", { updatedInfo });
    } catch (err) {
      return serviceResponse(500, "Internal Server Error", err.message);
    }
  }

  async delete(orgId) {
    try {
      const existedOrg = await organizationRepo.findById(orgId);
      if (!existedOrg) return serviceResponse(400, "Invalid Id");
      const org = await organizationRepo.deleteById(orgId);
      if (!org) return serviceResponse(400, "Invalid Id");
      return serviceResponse(200, "Successfully Deleted User", { org });
    } catch (err) {
      return serviceResponse(500, "Internal Server Errors", err.message);
    }
  }
}
module.exports = OrganizationService;
