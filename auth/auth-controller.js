const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userService = require("../services/user-service");
const roleService = require("../services/role-service");
const userRoleService = require("../services/user-role-service");
const { secret } = require("../config");

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: `${errors
            .array()
            .map((error) => error.msg)
            .join(", ")}`,
        });
      }

      const { email, password } = req.body;
      const candidate = await userService.getOneUserByEmail(email);

      if (candidate) {
        return res.status(400).json(`user with email ${email} already exists`);
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const { id: userId } = await userService.saveUser({
        password: hashPassword,
        email,
      });

      const roles = await roleService.getRoles();
      const { id: roleId } = roles.find((role) => role.name === "USER");

      await userRoleService.save(userId, roleId);

      return res.json({ message: `user with email ${email} was registered` });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: `${errors
            .array()
            .map((error) => error.msg)
            .join(", ")}`,
        });
      }

      const { email, password } = req.body;
      const user = await userService.getOneUserByEmail(email);

      if (!user) {
        return res
          .status(400)
          .json({ message: `user with email ${email} not found` });
      }

      const isValid = bcrypt.compareSync(password, user.password);

      if (!isValid) {
        return res.status(400).json({ message: `incorrect password` });
      }

      // Generate token
      const roles = (await userRoleService.getRoles(user.id)).map(
        (role) => role.roleName
      );

      const payload = { id: user.id, roles };

      const token = jwt.sign(payload, secret, { expiresIn: "24h" });

      // Update user info
      await userService.updateUser({
        id: user.id,
        ...req.body,
      });

      return res.json({ token });
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = new AuthController();
