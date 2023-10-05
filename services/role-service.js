const roleRepository = require("../repositories/role-repository");

class RoleService {
  async createRole(role) {
    const newRole = await roleRepository.createRole(role);
    return newRole;
  }

  async getRoles() {
    const roles = await roleRepository.getRoles();
    return roles;
  }

  async updateRole(role) {
    const updatedRole = await roleRepository.updateRole(role);
    return updatedRole;
  }

  async deleteRole(id) {
    const deletedRole = await roleRepository.deleteRole(id);
    return deletedRole;
  }
}

module.exports = new RoleService();
