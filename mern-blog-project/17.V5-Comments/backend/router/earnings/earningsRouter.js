const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const categoryController = require("../../controllers/categories/categoryController");
const earningsController = require("../../controllers/earnings/earningsController");

const earningsRouter = express.Router();

//----lists all earnings----
earningsRouter.get("/", earningsController.fetchAllEarnings);

module.exports = earningsRouter;
