const RolePermissions = require("../models/rolePermissions");

exports.getRolePermissions = (req, res) => {
  RolePermissions.find({}, (err, rolePermissions) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json(rolePermissions);
    }
  });
};

exports.updateRolePermission = (req, res) => {
  RolePermissions.findOneAndUpdate(
    { role: req.params.role, page: req.params.page },
    { enabled: req.body.enabled },
    { new: true },
    (err, rolePermission) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(rolePermission);
      }
    }
  );
};
