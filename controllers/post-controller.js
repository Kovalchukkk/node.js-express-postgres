const postService = require("../services/post-service");

class PostController {
  async createPost(req, res) {
    try {
      const post = await postService.createPost(req.body);
      return res.status(201).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await postService.getPosts();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getPostsByUser(req, res) {
    try {
      const { userId } = req.query;
      const posts = await postService.getPostsByUser(userId);
      if (!posts.length) {
        return res.status(404).json(`posts not found`);
      }
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json(`id was not provided`);
      }
      const updatedPost = await postService.updatePost(req.body);
      if (!updatedPost) {
        return res.status(404).json(`post with id ${id} not found`);
      }
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await postService.deletePost(id);
      if (!deletedPost) {
        return res.status(404).json(`post with id ${id} not found`);
      }
      return res.json(deletedPost);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = new PostController();
