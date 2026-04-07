const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts.controller");
const { authRequired } = require("../middlewares/auth.middleware");

router.post("/", authRequired, postsController.createPost);
router.get("/", authRequired, postsController.listPosts);
router.get("/:id", authRequired, postsController.getPostById);
router.put("/:id", authRequired, postsController.updatePostById);
router.delete("/:id", authRequired, postsController.deletePostById);
router.post("/:id/comments", authRequired, postsController.createComment);
router.get("/:id/comments", authRequired, postsController.getAllComments);
router.delete("/:id/comments/:id", authRequired, postsController.deleteCommentById);
router.post("/:id/like", authRequired, postsController.likePost);
router.post("/:id/unlike", authRequired, postsController.unlikePost);

module.exports = router;