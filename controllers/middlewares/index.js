const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers);
    const longToken = req.headers.authorization;
    if (!longToken) {
      return res.status(401).json({
        message: "token not present",
      });
    }
    const token = longToken.split(" ")[1];
    let user = JWT.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

const checkIfAdmin = (req, res, next) => {
  try {
    const longToken = req.headers.authorization;
    if (!longToken) {
      return res.status(401).json({
        message: "token not present",
      });
    }
    const token = longToken.split(" ")[1];
    let user = JWT.verify(token, process.env.JWT_SECRET);
    if (user.isAdmin) {
      req.user = user;
      next();
      return;
    } else {
      return res.status(403).json({
        message: "Forbidden, only admin can do this operation",
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  verifyToken,
  checkIfAdmin,
};
