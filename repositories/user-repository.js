const db = require("../db");

class UserRepository {
  async saveUser(user) {
    const { name = "", surname = "", email, password } = user;
    const newUser = await db.query(
      `INSERT INTO person (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, surname, email, password]
    );
    return newUser.rows[0];
  }

  async getUsers() {
    const users = await db.query(`SELECT * FROM person`);
    return users.rows;
  }

  async getOneUser(id) {
    const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);
    return user.rows[0];
  }

  async getOneUserByEmail(email) {
    const user = await db.query(`SELECT * FROM person WHERE email = $1`, [
      email,
    ]);
    return user.rows[0];
  }

  async updateUser(user) {
    const { id, name, surname } = user;
    const updatedUser = await db.query(
      `UPDATE person SET name = $1, surname = $2 WHERE id = $3 RETURNING *`,
      [name, surname, id]
    );
    return updatedUser.rows[0];
  }

  async deleteUser(id) {
    const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id]);
    if (user) {
      await db.query(`DELETE FROM post WHERE person_id = $1`, [id]);
      await db.query(`DELETE FROM person WHERE id = $1`, [id]);
    }
    return user.rows[0];
  }
}

module.exports = new UserRepository();
