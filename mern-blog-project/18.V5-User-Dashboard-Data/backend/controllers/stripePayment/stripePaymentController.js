const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const User = require("../../models/User/User");
const Payment = require("../../models/Payment/Payment");
//-----Stripe Payment-----
const stripePaymentController = {
  //----- payment
  payment: asyncHandler(async (req, res) => {
    //!. Get the plan ID
    const { subscriptionPlanId } = req.body;
    //!. Check for the valid id of the plan
    if (!mongoose.isValidObjectId(subscriptionPlanId)) {
      return res.json({ message: "Invalid subscription plan" });
    }
    //! Find the plan
    const plan = await Plan.findById(subscriptionPlanId);
    if (!plan) {
      return res.json({ message: "Plan not found" });
    }
    //! get the user
    const user = req.user;
    //! Create payment intent/making the payment
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: plan.price * 100,
        currency: "usd",
        // add some metadata
        metadata: {
          userId: user?.toString(),
          subscriptionPlanId,
        },
      });
      //! Send the response
      res.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionPlanId,
        paymentIntent,
      });
    } catch (error) {
      res.json({ error });
    }
  }),
  //verifying the payment
  verify: asyncHandler(async (req, res) => {
    //! Get the paymentId
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    console.log(paymentIntent);
    //! confirm the payment status
    if (paymentIntent.status !== "success") {
      //!get the data from the metadata
      const metadata = paymentIntent?.metadata;
      const subscriptionPlanId = metadata?.subscriptionPlanId;
      const userId = metadata.userId;
      //! Find the user
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.json({ message: "User not found" });
      }
      //! Get the payment details
      const amount = paymentIntent?.amount / 100;
      const currency = paymentIntent?.currency;
      // ! Create payment History
      const newPayment = await Payment.create({
        user: userId,
        subscriptionPlan: subscriptionPlanId,
        status: "success",
        amount,
        currency,
        reference: paymentId,
      });

      if (newPayment) {
        //!  Update the user profile
        userFound.hasSelectedPlan = true;
        userFound.plan = subscriptionPlanId;
        //resave
        await userFound.save();
      }
      //! Send the response
      res.json({
        status: true,
        message: "Payment verified, user updated",
        userFound,
      });
    }
  }),
  //Free plan
  free: asyncHandler(async (req, res) => {
    //check for the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    //update the user field
    user.hasSelectedPlan = true;
    await user.save();
    //send the response
    res.json({
      status: true,
      message: "Payment verified, user updated",
    });
  }),
};

module.exports = stripePaymentController;
