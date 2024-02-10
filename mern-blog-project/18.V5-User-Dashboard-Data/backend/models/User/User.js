const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    // Basic user information
    username: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: Object,
      default: null,
    },
    email: {
      type: String,
      required: false, // Set to false if email is not mandatory
    },
    password: {
      type: String,
      required: false, // Set to false if password is not mandatory
    },
    googleId: {
      type: String,
      required: false, // Required only for users logging in with Google
    },
    authMethod: {
      type: String,
      enum: ["google", "local", "facebook", "github"],
      required: true,
      default: "local",
    },

    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationToken: {
      type: String,
      default: null,
    },
    accountVerificationExpires: {
      type: Date,
      default: null,
    },
    passwordResetExpires: {
      type: Date,
      default: null,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    totalEarnings: { type: Number, default: 0 },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Sets to the first day of the next month
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    hasSelectedPlan: { type: Boolean, default: false },
    lastLogin: { type: Date, default: Date.now },

    // User relationships
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Link to other users
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
//! Generate token for account verification
userSchema.methods.generateAccVerificationToken = function () {
  const emailToken = crypto.randomBytes(20).toString("hex");
  //assign the token to the user
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  this.accountVerificationExpires = Date.now() + 10 * 60 * 1000; //10 minutes
  return emailToken;
};
//! Generate token for password reset
userSchema.methods.generatePasswordResetToken = function () {
  const emailToken = crypto.randomBytes(20).toString("hex");
  //assign the token to the user
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes
  return emailToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
