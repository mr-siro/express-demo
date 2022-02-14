const { User } = require("../models");
const userService = require("../services/user.service");
const { Op } = require("sequelize");
const { getPagination, getPagingData } = require("../utils/paginate");
exports.create = async (req, res) => {
  const checkExitUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  try {
    const result = await userService.create(req);

    if (!result) {
      if (res.status(400) && checkExitUser) {
        return res
          .json({ success: false, message: "User exited", data: null })
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
