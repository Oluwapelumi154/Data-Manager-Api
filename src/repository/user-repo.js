const Model = require("../model/user-model");
module.exports = {
  create: async (UserToCreate) => {
    const userData = await Model.create(UserToCreate);
    return userData;
  },

  find: async () => {
    const userData = await Model.find();
    return userData;
  },

  findByEmail: async (email) => {
    //const userData = await Model.findOne({ email }).select("+password");
    const userData = await Model.findOne({ email: email }).select("+password");
    return userData;
  },

  findById: async (orgId) => {
    const userData = await Model.findById(orgId);
    return userData;
  },

  updateById: async (orgId, existedOrgInfo) => {
    const orgData = await Model.findByIdAndUpdate(orgId, existedOrgInfo, {
      new: true,
      runValidators: true,
    });
    return orgData;
  },

  deleteById: async (orgId) => {
    const data = await Model.findByIdAndDelete(orgId);
    return data;
  },
  comparePassword: async (userPassword, hashedPassword) => {
    return await bcrypt.compare(userPassword, hashedPassword);
  },
};
