const express = require("express");
const roleController = require("../controllers/role-controller");

const router = express.Router();

router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.put("/", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
