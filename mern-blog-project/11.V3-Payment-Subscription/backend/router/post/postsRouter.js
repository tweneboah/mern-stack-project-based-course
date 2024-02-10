const express = require("express");
const multer = require("multer");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
//create multer instance
const upload = multer({ storage });
//!create instance express router
const postRouter = express.Router();

//-----Create post----

postRouter.post(
  "/create",
  isAuthenticated,
  checkUserPlan,
  upload.single("image"),
  postController.createPost
);

//----lists all posts----
postRouter.get("/", postController.fetchAllPosts);

//----update post----
postRouter.put("/:postId", isAuthenticated, postController.update);

//--- get post---
postRouter.get("/:postId", postController.getPost);

//---delete post---
postRouter.delete("/:postId", isAuthenticated, postController.delete);

module.exports = postRouter;
