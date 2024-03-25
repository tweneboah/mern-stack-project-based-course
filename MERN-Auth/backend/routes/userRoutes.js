const express = require("express");
const usersController = require("../controllers/users");
const isAuthenticated = require("../middlewares/isAuthenticated");

const userRouter = express.Router();

userRouter.post("/api/users/register", usersController.register);
userRouter.post("/api/users/login", usersController.login);
userRouter.get("/api/users/profile", isAuthenticated, usersController.profile);

module.exports = userRouter;
