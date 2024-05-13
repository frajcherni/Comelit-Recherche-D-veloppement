const express = require("express");
const router = express.Router();
const rolePermissionsController = require("../controller/rolePermissionsController");

router.get("/", rolePermissionsController.getRolePermissions);
router.put("/:role/:page", rolePermissionsController.updateRolePermission);

module.exports = router;
