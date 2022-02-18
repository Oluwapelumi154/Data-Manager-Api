const Model = require("../model/org-model");

module.exports = {
  create: async (orgToCreate) => {
    const orgData = await Model.create(orgToCreate);
    return orgData;
  },

  find: async () => {
    const orgData = await Model.find().populate("credentials");
    return orgData;
  },

  findById: async (orgId) => {
    const OrgData = await Model.findById(orgId);
    return OrgData;
  },

  findByName: async (name) => {
    console.log(name);
    const OrgData = await Model.findOne({ name });
    return OrgData;
  },

  updateById: async (credId, existedOrgInfo) => {
    const orgData = await Model.findByIdAndUpdate(credId, existedOrgInfo, {
      new: true,
      runValidators: true,
    });
    return orgData;
  },
  deleteById: async (orgId) => {
    const data = await Model.findOneAndDelete({ _id: orgId });
    return data;
  },
};
