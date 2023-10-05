const express = require("express");
const roleController = require("../controllers/role-controller");

const router = express.Router();

router.post("/roles", roleController.createRole);
router.get("/roles", roleController.getRoles);
router.put("/roles", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);

module.exports = router;
