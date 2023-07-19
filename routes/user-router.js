const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getOneUser);
router.put("/users", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
