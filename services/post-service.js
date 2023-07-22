const postRepository = require("../repositories/post-repository");

class PostService {
  async createPost(post) {
    const createdPost = await postRepository.createPost(post);
    return createdPost;
  }

  async getPosts() {
    const posts = await postRepository.getPosts();
    return posts;
  }

  async getPostsByUser(userId) {
    const posts = await postRepository.getPostsByUser(userId);
    return posts;
  }

  async updatePost(post) {
    const updatedPost = await postRepository.updatePost(post);
    return updatedPost;
  }

  async deletePost(id) {
    const deletedPost = await postRepository.deletePost(id);
    return deletedPost;
  }
}

module.exports = new PostService();
