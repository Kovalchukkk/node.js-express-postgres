const userService = require("../services/user-service");

class UserController {
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await userService.getUsers();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getOneUser(id);
      if (!user) {
        return res.status(404).json(`user with id ${id} not found`);
      }
      return res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json(`id was not provided`);
      }
      const updatedUser = await userService.updateUser(req.body);
      if (!updatedUser) {
        return res.status(404).json(`user with id ${id} not found`);
      }
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json(`user with id ${id} not found`);
      }
      return res.json(deletedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = new UserController();
