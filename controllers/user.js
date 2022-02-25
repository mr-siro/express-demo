const userService = require("../services/user");
const { getPagination, getPagingData } = require("../utils/paginate");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const config = require("../config/auth");
const { checkExitedUser, handleController } = require("../common/function");

exports.signup = (req, res) => {
  handleController(async () => {
    const result = await userService.signup(req);
    const token = jwt.sign({ id: result.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    const response = {
      token: token,
      user: result,
    };
    return res
      .json({ success: true, message: "success", data: response })
      .status(200);
  });
};

exports.delete = (req, res) => {
  handleController(async () => {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Người dùng không tồn tại." });
    } else {
      await userService.delete(req);
      return res
        .json({ success: true, message: "delete user success" })
        .status(200);
    }
  });
};

exports.update = async (req, res) => {
  const user = await checkExitedUser(req.body.email);
  try {
    const result = await userService.update(req);
    if (!result) {
      if (res.status(400) && !user) {
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

exports.getAll = (req, res) => {
  handleController(async () => {
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
  });
};

exports.getOne = (req, res) => {
  handleController(async () => {
    const result = await userService.getOne(req);
    if (!result) {
      return res
        .json({ success: false, message: "user not exited" })
        .status(404);
    }
    return res
      .json({ success: true, message: "success", data: result })
      .status(200);
  });
};

exports.signin = async (req, res) => {
  const user = await checkExitedUser(req.body.email);
  handleController(() => {
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    return res
      .json({ success: true, message: "success", data: { token: token } })
      .status(200);
  });
};
