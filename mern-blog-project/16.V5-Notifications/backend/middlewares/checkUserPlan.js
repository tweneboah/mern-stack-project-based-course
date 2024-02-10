const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const checkUserPlan = asyncHandler(async (req, res, next) => {
  try {
    //get the login
    const user = await User.findById(req.user);
    //check user plan
    if (!user?.hasSelectedPlan) {
      return res.status(401).json({
        message: "You must select a plan before creating a post",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

module.exports = checkUserPlan;
