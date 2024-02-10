const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");
const checkUserPlan = require("../../middlewares/checkUserPlan");

const stripePaymentRouter = express.Router();

//-----Create payment----

stripePaymentRouter.post(
  "/checkout",
  isAuthenticated,
  stripePaymentController.payment
);

//----verify payment----
stripePaymentRouter.get("/verify/:paymentId", stripePaymentController.verify);
stripePaymentRouter.get(
  "/free-plan",
  isAuthenticated,
  stripePaymentController.free
);

module.exports = stripePaymentRouter;
