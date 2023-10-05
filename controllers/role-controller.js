const roleService = require("../services/role-service");

class RoleController {
  async createRole(req, res) {
    try {
      const role = await roleService.createRole(req.body);
      return res.json(role);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getRoles(req, res) {
    try {
      const roles = await roleService.getRoles();
      return res.json(roles);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateRole(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json(`id was not provided`);
      }
      const updatedRole = await roleService.updateRole(req.body);
      if (!updatedRole) {
        return res.status(404).json(`role with id ${id} not found`);
      }
      return res.json(updatedRole);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);
      if (!deletedRole) {
        return res.status(404).json(`role with id ${id} not found`);
      }
      return res.json(deletedRole);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = new RoleController();
