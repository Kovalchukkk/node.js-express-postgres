const userRoleRepository = require("../repositories/user-role-repository");

class UserRoleService {
  async getRoles(userId) {
    const roles = await userRoleRepository.getRolesByUserId(userId);
    return roles;
  }

  async save(userId, roleId) {
    const newUserRole = await userRoleRepository.save(userId, roleId);
    return newUserRole;
  }

  async delete(userId, roleId) {
    const deletedUserRole = await userRoleRepository.delete(userId, roleId);
    return deletedUserRole;
  }
}

module.exports = new UserRoleService();
