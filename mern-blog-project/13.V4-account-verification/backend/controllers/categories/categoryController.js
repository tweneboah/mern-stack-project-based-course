const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Category/Category");

const categoryController = {
  //!Create category
  createCategory: asyncHandler(async (req, res) => {
    const { categoryName, description } = req.body;
    //check if category exists
    const categoryFound = await Category.findOne({ categoryName, description });
    if (categoryFound) {
      throw new Error("Category already exists");
    }
    //create the category
    const categoryCreated = await Category.create({
      categoryName,
      author: req.user,
    });
    res.json({
      status: "success",
      message: "Category created successfully",
      categoryCreated,
    });
  }),

  //!list all categories
  fetchAllCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
      status: "success",
      message: "Category fetched successfully",
      categories,
    });
  }),
  //! get a post
  getCategory: asyncHandler(async (req, res) => {
    //get the category id from params
    const categoryId = req.params.categoryId;
    //find the category
    const categoryFound = await Category.findById(categoryId);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      categoryFound,
    });
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    //get the category id from params
    const categoryId = req.params.categoryId;
    //find the category
    await Category.findByIdAndDelete(categoryId);
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  }),
  //! update category
  update: asyncHandler(async (req, res) => {
    //get the category id from params
    const categoryId = req.params.categoryId;
    //find the category
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error("Category  not found");
    }
    console.log(categoryId);
    //update
    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      {
        categoryName: req.body.categoryName,
        description: req.body.description,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Category updated successfully",
      categoryUpdated,
    });
  }),
};

module.exports = categoryController;
