const express = require("express");
const multer = require("multer");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
const optionalAuth = require("../../middlewares/optionalAuth");
const isAccountVerified = require("../../middlewares/isAccountVerified");
//create multer instance
const upload = multer({ storage });
//!create instance express router
const postRouter = express.Router();

//-----Create post----

postRouter.post(
  "/create",
  isAuthenticated,
  checkUserPlan,
  isAccountVerified,
  upload.single("image"),
  postController.createPost
);

//----lists all posts----
postRouter.get("/", postController.fetchAllPosts);

//----update post----
postRouter.put(
  "/:postId",
  isAuthenticated,
  upload.single("image"),
  postController.update
);

//--- get post---
postRouter.get("/:postId", optionalAuth, postController.getPost);

//---delete post---
postRouter.delete("/:postId", isAuthenticated, postController.delete);
//---like post----
postRouter.put("/likes/:postId", isAuthenticated, postController.like);
//---like post----
postRouter.put("/dislikes/:postId", isAuthenticated, postController.dislike);

module.exports = postRouter;
