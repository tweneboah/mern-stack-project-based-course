const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const usersController = {
  //!Register
  register: async (req, res) => {
    try {
      //get the payload
      const { username, email, password } = req.body;
      //! Check if username exists
      const userFound = await User.findOne({ username });
      if (userFound) {
        return res.send("User already exists");
      }
      //! Create the user
      const userCreated = new User({ username, email, password });
      //! Hash user password
      const salt = await bcrypt.genSalt(10);
      userCreated.password = await bcrypt.hash(password, salt);
      //! Save the user
      await userCreated.save();
      console.log(userCreated);
      res.json({
        status: "success",
        _id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        message: "Welcome to register controller",
      });
    } catch (error) {
      res.json(error);
    }
  },
  //!Login
  login: async (req, res) => {
    const { username, password } = req.body;
    //!Validate
    if (!username || !password) {
      return res.send("Username and password are required");
    }
    try {
      //!Find the user
      const userFound = await User.findOne({ username });
      if (!userFound) {
        return res.send("Invalid credentials");
      }
      //!Compare
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.send("Invalid credentials");
      }
      const payload = {
        user: {
          id: userFound._id,
        },
      };
      //!Generate token
      const token = jwt.sign(payload, "anyKey", {
        expiresIn: 259200, //Expires in 2days
      });
      res.json({
        message: "Login success",
        token,
        user: {
          _id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        },
      });
    } catch (error) {
      res.send(error);
    }
  },
  //! Profile
  profile: async (req, res) => {
    try {
      const user = await User.findById("6601484c453a6e801901a3b8");
      res.json(user);
    } catch (error) {
      res.send(error.message);
    }
  },
};

module.exports = usersController;
