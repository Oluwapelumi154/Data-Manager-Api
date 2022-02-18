const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const credentialSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    IpAddress: { type: String, required: true },
    description: { type: String, required: true },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
  },
  { timestamps: true }
);
credentialSchema.pre("save", function (next) {
  this.password = encrypt(this.password);
  next();
});
const orgInfo = mongoose.model("credentials", credentialSchema);
module.exports = orgInfo;
