const mongoose = require("mongoose");
const orgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
orgSchema.set("toObject", { virtuals: true });
orgSchema.set("toJSON", { virtuals: true });
orgSchema.virtual("credentials", {
  ref: "credentials",
  localField: "_id",
  foreignField: "orgId",
});
const orgInfo = mongoose.model("organization", orgSchema);
module.exports = orgInfo;
