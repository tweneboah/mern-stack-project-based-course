const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/categories/categoryController");
const commentsController = require("../../controllers/comments/commentsController");

const commentRouter = express.Router();

//-----Create comment----

commentRouter.post("/create", isAuthenticated, commentsController.create);

module.exports = commentRouter;
