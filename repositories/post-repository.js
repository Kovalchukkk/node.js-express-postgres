const db = require("../db");

class PostRepository {
  async createPost(post) {
    const { title, content, userId } = post;
    const newPost = await db.query(
      `INSERT INTO post (title, content, person_id) VALUES ($1, $2, $3) RETURNING *`,
      [title, content, userId]
    );
    return newPost.rows[0];
  }

  async getPosts() {
    const posts =
      await db.query(`SELECT person.id AS "userId", post.id AS "postId", 
      person.name, person.surname, post.title, post.content  FROM person
      JOIN post ON person.id = post.person_id LIMIT 10`);
    return posts.rows;
  }

  async getPostsByUser(userId) {
    const posts = await db.query(
      `SELECT person.id AS "userId", post.id AS "postId", person.name, person.surname, 
       post.title, post.content FROM person JOIN post ON person.id = post.person_id
       WHERE person.id = $1 LIMIT 10`,
      [userId]
    );
    return posts.rows;
  }

  async updatePost(post) {
    const { id, title, content } = post;
    const updatedPost = await db.query(
      `UPDATE post SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
      [title, content, id]
    );
    return updatedPost.rows[0];
  }

  async deletePost(id) {
    const post = await db.query(`SELECT * FROM post WHERE id = $1`, [id]);
    if (post) {
      await db.query(`DELETE FROM post WHERE id = $1`, [id]);
    }
    return post.rows[0];
  }
}

module.exports = new PostRepository();
