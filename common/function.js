const { User } = require("../models");
const { Op } = require("sequelize");

// checkExitedUser
exports.checkExitedUser = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
      deletedAt: {
        [Op.is]: null,
      },
    },
    attributes: { include: ["password"] },
  });

  if (user) {
    return user;
  } else {
    return false;
  }
};

// handleController
exports.handleController = (callback) => {
  try {
    return callback();
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};

