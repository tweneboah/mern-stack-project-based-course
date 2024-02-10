const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Comment = require("../../models/Comment/Comment");

const commentsController = {
  //!Create comments
  create: asyncHandler(async (req, res) => {
    //. Find the post ID
    const { postId, content } = req.body;
    //. Find the post
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    //. Create the comment
    const commentCreated = await Comment.create({
      content,
      author: req.user,
      post: postId,
    });

    //. Push the comment to the post
    post.comments.push(commentCreated?._id);
    await post.save();
    //. Send the response
    res.json({
      status: "success",
      message: "Comment created successfully",
      commentCreated,
    });
  }),

  //! delete
  delete: asyncHandler(async (req, res) => {}),
  //! update category
  update: asyncHandler(async (req, res) => {}),
};

module.exports = commentsController;
