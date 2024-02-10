const passport = require("passport");

const optionalAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      req.user = null;
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = optionalAuth;
