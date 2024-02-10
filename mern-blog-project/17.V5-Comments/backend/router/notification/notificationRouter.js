const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const notificationController = require("../../controllers/notifications/notificationController");

const notificationRouter = express.Router();

//-----lists----

notificationRouter.get("/", notificationController.fetchNotifications);

//----read notification ----
notificationRouter.put(
  "/:notificationId",
  notificationController.readNofictaion
);

module.exports = notificationRouter;
