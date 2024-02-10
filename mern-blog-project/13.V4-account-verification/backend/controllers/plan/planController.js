const asyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/Plan");

const planController = {
  //!Create plan
  createPlan: asyncHandler(async (req, res) => {
    const { planName, features, price } = req.body;
    //check if plan exists
    const planFound = await Plan.findOne({ planName });
    if (planFound) {
      throw new Error("Plan already exists");
    }
    //check if total plans are two
    const planCount = await Plan.countDocuments();
    if (planCount >= 2) {
      throw new Error("You cannot add more two plans");
    }
    //create the plan
    const planCreated = await Plan.create({
      planName,
      features,
      price,
      user: req.user,
    });
    res.json({
      status: "success",
      message: "Plan created successfully",
      planCreated,
    });
  }),

  //!list all plans
  lists: asyncHandler(async (req, res) => {
    const plans = await Plan.find();
    res.json({
      status: "success",
      message: "Plans fetched successfully",
      plans,
    });
  }),
  //! get a plan
  getPlan: asyncHandler(async (req, res) => {
    //get the plan id from params
    const planId = req.params.planId;
    //find the plan
    const planFound = await Plan.findById(planId);
    res.json({
      status: "success",
      message: "Plan fetched successfully",
      planFound,
    });
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    //get the plan id from params
    const planId = req.params.planId;
    //find the plan
    await Plan.findByIdAndDelete(planId);
    res.json({
      status: "success",
      message: "Plan deleted successfully",
    });
  }),
  //! update plan
  update: asyncHandler(async (req, res) => {
    //get the category id from params
    const planId = req.params.planId;
    //find the category
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error("Plan  not found");
    }

    //update
    const planUpdated = await Plan.findByIdAndUpdate(
      planId,
      {
        planName: req.body.planName,
        features: req.body.features,
        price: req.body.price,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "Plan updated successfully",
      planUpdated,
    });
  }),
};

module.exports = planController;
