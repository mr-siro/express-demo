const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config/auth");
const { Op } = require("sequelize");

verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ success: false, message: "Unauthorized!" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!",
      });
    }
    User.findOne({
      where: {
        id: decoded.id,
        deletedAt: {
          [Op.is]: null,
        },
      },
    }).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
