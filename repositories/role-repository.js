const db = require("../db");

class RoleRepository {
  async createRole(role) {
    const { name } = role;
    const newRole = await db.query(
      `INSERT INTO role (name) VALUES ($1) RETURNING *`,
      [name]
    );
    return newRole.rows[0];
  }

  async getRoles() {
    const roles = await db.query(`SELECT * FROM role`);
    return roles.rows;
  }

  async updateRole(role) {
    const { id, name } = role;
    const updatedRole = await db.query(
      `UPDATE role SET name = $1 WHERE id = $2 RETURNING *`,
      [name, id]
    );
    return updatedRole.rows[0];
  }

  async deleteRole(id) {
    const role = await db.query(`SELECT * FROM role WHERE id = $1`, [id]);
    if (role) {
      await db.query(`DELETE FROM person_role WHERE role_id = $1`, [id]);
      await db.query(`DELETE FROM role WHERE id = $1`, [id]);
    }
    return role.rows[0];
  }
}

module.exports = new RoleRepository();
