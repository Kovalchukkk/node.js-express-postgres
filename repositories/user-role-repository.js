const db = require("../db");

class UserRoleRepository {
  async getRolesByUserId(userId) {
    const roles = await db.query(
      `SELECT role.name AS "roleName" FROM role 
      JOIN person_role on role.id = person_role.role_id 
      WHERE person_role.person_id = $1`,
      [userId]
    );
    return roles.rows;
  }

  async save(userId, roleId) {
    const newUserRole = await db.query(
      `INSERT INTO person_role (person_id, role_id) VALUES ($1, $2) RETURNING *`,
      [userId, roleId]
    );
    return newUserRole.rows[0];
  }

  async delete(userId, roleId) {
    const userRole = await db.query(
      `SELECT * FROM person_role WHERE person_id = $1 AND role_id = $2`,
      [userId, roleId]
    );
    if (userRole.rows[0]) {
      await db.query(
        `DELETE FROM person_role WHERE person_id = $1 AND role_id = $2`,
        [userId, roleId]
      );
    }
    return userRole.rows[0];
  }
}

module.exports = new UserRoleRepository();
