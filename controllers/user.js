const { User } = require("../models");
const userService = require("../services/user");
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../utils/paginate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth");
exports.signup = async (req, res) => {
  const checkExitUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  try {
    const result = await userService.signup(req);
    const token = jwt.sign({ id: result.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    const response = {
      token: token,
      user: result,
    };
    if (!result) {
      if (res.status(400) && checkExitUser) {
        return res
          .json({
            success: false,
            message: "Failed! Username is already in use!",
            data: null,
          })
          .status(400);
      } else {
        return res
          .json({ success: false, message: "Invalid field", data: null })
          .status(400);
      }
    }

    return res
      .json({ success: true, message: "success", data: response })
      .status(200);
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};

exports.delete = async (req, res) => {
  await userService.delete(req);
  return res
    .json({ success: true, message: "delete user success" })
    .status(200);
};

exports.update = async (req, res) => {
  const checkExitUser = await User.findOne({
    where: {
      id: req.params.id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  try {
    const result = await userService.update(req);
    if (!result) {
      if (res.status(400) && !checkExitUser) {
        return res
          .json({ success: false, message: "User not exited", data: null })
          .status(400);
      } else {
        return res
          .json({ success: false, message: "Invalid field", data: null })
          .status(400);
      }
    }
    return res
      .json({ success: true, message: "success", data: result })
      .status(200);
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit } = getPagination(page, size);
    const result = await userService.getAll(req);
    const convertData = getPagingData(result, page, limit);
    return res.json({
      success: true,
      message: "success",
      data: {
        data: convertData.result,
        meta: {
          total: convertData.total,
          totalPage: convertData.totalPage,
          currentPage: convertData.currentPage,
        },
      },
    });
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};

exports.getOne = async (req, res) => {
  try {
    const result = await userService.getOne(req);
    if (!result) {
      return res
        .json({ success: false, message: "user not exited" })
        .status(404);
    }
    return res
      .json({ success: true, message: "success", data: result })
      .status(200);
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};

exports.signin = async (req, res) => {
  const checkExitUser = await User.findOne({
    where: {
      email: req.body.email,
      deletedAt: {
        [Op.is]: null,
      },
    },
    attributes: { include: ["password"] },
  });
  try {
    if (!checkExitUser) {
      return res
        .json({ success: false, message: "user not exited" })
        .status(404);
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      checkExitUser.password
    );
    if (!passwordIsValid) {
      return res
        .json({
          success: false,
          message: "Invalid Password!",
        })
        .status(401);
    }
    const token = jwt.sign({ id: checkExitUser.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    return res
      .json({ success: true, message: "success", data: { token: token } })
      .status(200);
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};
