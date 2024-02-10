const asyncHandler = require("express-async-handler");
const Notification = require("../../models/Notification/Notification");
const mongoose = require("mongoose");

const notificationController = {
  //!list all notifications
  fetchNotifications: asyncHandler(async (req, res) => {
    const notifications = await Notification.find();
    res.json(notifications);
  }),

  //! Read notification
  readNofictaion: asyncHandler(async (req, res) => {
    //get the notification id from params
    const notificationId = req.params.notificationId;
    //check if id is valid
    const isValidId = mongoose.Types.ObjectId.isValid(notificationId);
    if (!isValidId) {
      throw new Error("Invalid notification ID");
    }
    //Update
    await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      {
        new: true,
      }
    );
    res.json({ message: "Notificated read" });
  }),
};

module.exports = notificationController;
