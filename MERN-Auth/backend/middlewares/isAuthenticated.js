const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header obj
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  console.log(token);
  //!Verify the token
  const VerifiedToken = jwt.verify(token, "anyKey", (err, decoded) => {
    console.log(decoded);
  });
  //! Find the user
  //!Save the user into the req obj

  next();
};

module.exports = isAuthenticated;
