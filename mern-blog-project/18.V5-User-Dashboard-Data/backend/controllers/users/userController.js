const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User/User");
const sendAccVerificationEmail = require("../../utils/sendAccVerificationEmail");
const sendPasswordEmail = require("../../utils/sendPasswordEmail");

//-----User Controller---

const userController = {
  // !Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //Check if username already exist
    const userFound = await User.findOne({ username, email });
    if (userFound) {
      throw new Error("User already exists");
    }
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Register the user
    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    //send the response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      userRegistered,
    });
  }),
  // ! Login
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      //check if user not found
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      //generate token
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      //set the token into cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      //send the response
      res.json({
        status: "success",
        message: "Login Success",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
  // ! googleAuth-->
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),
  // ! GoogleAuthCallback
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      (err, user, info) => {
        if (err) return next(err);
        if (!user) {
          return res.redirect("http://localhost:5173/google-login-error");
        }
        //generate the token

        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });
        //set the token into the cooke
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, //1 day:
        });
        //redirect the user dashboard
        res.redirect("http://localhost:5173/dashboard");
      }
    )(req, res, next);
  }),
  // ! check user authentication status
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //find the user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      } else {
        return res.status(200).json({
          isAuthenticated: true,
          _id: user?._id,
          username: user?.username,
          profilePicture: user?.profilePicture,
        });
      }
    } catch (error) {}
    return res.status(401).json({ isAuthenticated: false, error });
  }),
  // ! Logout
  logout: asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout success" });
  }),
  //! Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user)
      .populate("followers")
      .populate("following")
      .populate("posts")
      .select(
        "-password -passwordResetToken -accountVerificationToken -accountVerificationExpires -passwordResetExpires"
      );
    res.json({ user });
  }),
  // !Following
  followUser: asyncHandler(async (req, res) => {
    //1. Find the user who wants to follow user (req.user)
    const userId = req.user;
    //2. Get the user to follow (req.params)
    const followId = req.params.followId;
    // Check if the userId and followId are the same

    //3. Update the users followers and following arrays
    //Udate the user who is following a user
    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { following: followId },
      },
      { new: true }
    );
    //Udate the user who is been followed followers array
    await User.findByIdAndUpdate(
      followId,
      {
        $addToSet: { followers: userId },
      },
      { new: true }
    );
    res.json({
      message: "User followed",
    });
  }),
  // !UnFollowing
  unFollowUser: asyncHandler(async (req, res) => {
    //1. Find the user who wants to follow user (req.user)
    const userId = req.user;
    //2. Get the user to follow (req.params)
    const unfollowId = req.params.unfollowId;
    //Find the users
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);
    if (!user || !unfollowUser) {
      throw new Error("User not found");
    }
    user.following.pull(unfollowId);
    unfollowUser.followers.pull(userId);
    //save the users
    await user.save();
    await unfollowUser.save();
    res.json({
      message: "User unfollowed",
    });
  }),
  //! Verify email acount (token)
  verifyEmailAccount: asyncHandler(async (req, res) => {
    //find the login user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found please login");
    }
    // check if user email exists
    if (!user?.email) {
      throw new Error("Email not found");
    }
    //use the method from the model
    const token = await user.generateAccVerificationToken();
    //resave the user
    await user.save();
    //send the email
    sendAccVerificationEmail(user?.email, token);
    res.json({
      message: `Account verification email sent to ${user?.email} token expires in 10 minutes`,
    });
  }),
  //! Verify email acount
  verifyEmailAcc: asyncHandler(async (req, res) => {
    //Get the token
    const { verifyToken } = req.params;
    //Convert the token to actual token that has been saved in our db
    const cryptoToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");
    //Find the user
    const userFound = await User.findOne({
      accountVerificationToken: cryptoToken,
      accountVerificationExpires: { $gt: Date.now() },
    });
    if (!userFound) {
      throw new Error("Account verification expires");
    }

    //Update the user field
    userFound.isEmailVerified = true;
    userFound.accountVerificationToken = null;
    userFound.accountVerificationExpires = null;
    //resave the user
    await userFound.save();
    res.json({ message: "Account successfully verified" });
  }),

  //! forgot password (sending email token)
  forgotPassword: asyncHandler(async (req, res) => {
    //find the user email
    const { email } = req.body;
    // find the user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`User with email ${email} is not found in our database`);
    }
    //check if user registered with google
    if (user.authMethod !== "local") {
      throw new Error("Please login with your social account");
    }

    //use the method from the model
    const token = await user.generatePasswordResetToken();
    //resave the user
    await user.save();
    //send the email
    sendPasswordEmail(user?.email, token);
    res.json({
      message: `Password reset email sent to ${email}`,
    });
  }),
  //! reset password
  resetPassword: asyncHandler(async (req, res) => {
    //Get the token
    const { verifyToken } = req.params;
    const { password } = req.body;

    //Convert the token to actual token that has been saved in our db
    const cryptoToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");
    //Find the user
    const userFound = await User.findOne({
      passwordResetToken: cryptoToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!userFound) {
      throw new Error("Password reset token expires");
    }

    //Update the user field
    //change the password
    const salt = await bcrypt.genSalt(10);
    userFound.password = await bcrypt.hash(password, salt);
    userFound.passwordResetToken = null;
    userFound.passwordResetExpires = null;
    //resave the user
    await userFound.save();
    res.json({ message: "Password successfully reset" });
  }),
  // update email
  updateEmail: asyncHandler(async (req, res) => {
    //email
    const { email } = req.body;
    //Find the user
    const user = await User.findById(req.user);
    //update the user email
    user.email = email;
    user.isEmailVerified = false;
    //save the user
    await user.save();
    //use the method from the model
    const token = await user.generateAccVerificationToken();
    //send the verification email
    sendAccVerificationEmail(user?.email, token);
    //send the response
    res.json({
      message: `Account verification email sent to ${user?.email} token expires in 10 minutes`,
    });
  }),
  //! Update profile picture
  updateProfilePic: asyncHandler(async (req, res) => {
    //Find the user
    await User.findByIdAndUpdate(
      req.user,
      {
        $set: { profilePicture: req.file },
      },
      { new: true }
    );
    //send the response
    res.json({
      message: "Profile picture updated successfully",
    });
  }),
};

module.exports = userController;
