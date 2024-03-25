require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();

//* ---Connect to mongoDB---
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((e) => console.log(e));
//!---Middlewares
app.use(express.json()); //pass incoming JSON Data

//!---Route middlewares
app.use("/", userRouter);
//!---Start the server----
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running ${PORT}...`));
