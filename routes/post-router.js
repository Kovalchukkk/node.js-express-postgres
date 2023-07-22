const express = require("express");
const postController = require("../controllers/post-controller");

const router = express.Router();

router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/user", postController.getPostsByUser);
router.put("/posts", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;
