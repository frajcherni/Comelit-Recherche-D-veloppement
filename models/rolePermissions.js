const mongoose = require("mongoose");

const rolePermissionsSchema = new mongoose.Schema({
  role: { type: String, required: true },
  page: { type: String, required: true },
  enabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("RolePermissions", rolePermissionsSchema);
