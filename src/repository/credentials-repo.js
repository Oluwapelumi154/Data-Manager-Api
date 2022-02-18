const Model = require("../model/credentials-model");

module.exports = {
  create: async (orgToCreate) => {
    const orgData = await Model.create(orgToCreate);
    return orgData;
  },

  find: async () => {
    const orgData = await Model.find().select("+Password");
    return orgData;
  },

  findById: async (orgId) => {
    const OrgData = await Model.findById(orgId);
    return OrgData;
  },

  findByName: async (username) => {
    const OrgData = await Model.findOne({ username });
    return OrgData;
  },

  updateById: async (credId, existedOrgInfo) => {
    const orgData = await Model.findByIdAndUpdate(credId, existedOrgInfo, {
      new: true,
      runValidators: true,
    });
    return orgData;
  },
  deleteById: async (credId) => {
    const data = await Model.findOneAndDelete({ _id: credId });
    return data;
  },
};
