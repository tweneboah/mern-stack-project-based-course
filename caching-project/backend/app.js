const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const redisClient = require("./utils/redisClient.js");
//!Connect to mongodb
mongoose
  .connect(
    "mongodb+srv://inovotek:Y8MtpWcYhID3JlwS@mongodb-demo.lqjq2rn.mongodb.net/cahching?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB is connected"))
  .catch((e) => console.log(e));
//! User model
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);
//! cors options
const corsOptions = {
  origin: ["http://localhost:5173"],
};

//! User model
const User = mongoose.model("User", userSchema);
const app = express();

//! Middlewares
app.use(express.json());
app.use(cors(corsOptions));

//! Create user route
app.post("/users/create", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    // Invalidate cache after creating a new user
    await redisClient.del("allUsers");
    res.json(user);
  } catch (error) {
    res.send("Server error");
  }
});

//! lists
app.get("/users/lists", async (req, res) => {
  try {
    // check cache
    const cacheKey = "allUsers";
    const cachedusers = await redisClient.get(cacheKey);
    if (cachedusers) {
      console.log("Cache hit - Users fetched from redis");
      return res.json({ users: JSON.parse(cachedusers) });
    }
    //! Cache miss, query mongodb
    const users = await User.find();
    if (users.length) {
      await redisClient.set(cacheKey, JSON.stringify(users), "EX", 3600); //Cache for one hr
      console.log("Cache miss - Users fetched from Mongodb");
      res.json(users);
    }
  } catch (error) {
    res.send("Server error");
  }
});
//! Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running`));
