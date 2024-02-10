const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/categories/categoryController");

const categoriesRouter = express.Router();

//-----Create category----

categoriesRouter.post(
  "/create",
  isAuthenticated,
  categoryController.createCategory
);

//----lists all categories----
categoriesRouter.get("/", categoryController.fetchAllCategories);

//----update category----
categoriesRouter.put(
  "/:categoryId",
  isAuthenticated,
  categoryController.update
);

//--- get category---
categoriesRouter.get("/:categoryId", categoryController.getCategory);

//---delete category---
categoriesRouter.delete(
  "/:categoryId",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoriesRouter;
