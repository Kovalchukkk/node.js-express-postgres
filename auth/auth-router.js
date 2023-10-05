const { check } = require("express-validator");
const express = require("express");
const authController = require("./auth-controller");

const router = express.Router();

router.post(
  "/registration",
  [
    check("email", "email is required").notEmpty(),
    check("email", "bad spelling for email").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "password must contain from 4 to 10 characters").isLength(
      { min: 4, max: 10 }
    ),
  ],
  authController.registration
);
router.post(
  "/login",
  [
    check("email", "email is required").notEmpty(),
    check("email", "bad spelling for email").isEmail(),
    check("password", "password is required").notEmpty(),
    check("password", "password must contain from 4 to 10 characters").isLength(
      { min: 4, max: 10 }
    ),
    check("name", "name is required").notEmpty(),
    check("surname", "surname is required").notEmpty(),
  ],
  authController.login
);

module.exports = router;
