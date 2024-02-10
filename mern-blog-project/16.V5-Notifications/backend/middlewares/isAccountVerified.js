const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const isAccountVerified = asyncHandler(async (req, res, next) => {
  try {
    //get the login
    const user = await User.findById(req.user);
    //check user plan
    if (!user?.isEmailVerified) {
      return res.status(401).json({
        message: "Action denied, email not verified",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

module.exports = isAccountVerified;
