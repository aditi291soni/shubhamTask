const jwt = require("jsonwebtoken");
const {CreateError}=require('./error')

exports.verifyTokens = (req, res, next) => {
  const token = req.cookie.access_token;
  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.jwt_secret, (err, data) => {
    if (err) {
      return next();
    }
    req.user = data;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  verifyTokens(req, res, (err, data) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      //   res.status(401).json({ message: "You are not authenticated" });
      return next(CreateError(403, "Invalid Token"));
    }
  });
};
exports.verifyAdmin = (req, res, next) => {
  verifyTokens(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(CreateError(403, "Invalid Token"));
      //   res.status(401).json({ message: "You are not authenticated" });
    }
  });
};
