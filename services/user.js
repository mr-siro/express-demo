const { User } = require("../models");
const { Op } = require("sequelize");
const { getPagination } = require("../utils/paginate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.create = async (req) => {
  const data = req.body;
  const checkExitUser = await User.findOne({
    where: {
      email: data.email,
    },
  });
  if (!checkExitUser) {
    const user = await User.create({
      name: data.name,
      email: data.email,
      password: bcrypt.hashSync(req.body.password, 8),
      status: data.status,
    });
    return user;
  } else {
    return false;
  }
};

exports.delete = async (req) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  return user;
};

exports.update = async (req) => {
  const data = req.body;
  const checkExitUser = await User.findOne({
    where: {
      id: req.params.id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  if (req.params.id && checkExitUser) {
    const user = await User.update(
      {
        name: data.name,
        email: data.email,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return user;
  } else {
    return false;
  }
};

exports.getAll = async (req) => {
  const { page, size, name } = req.query;
  const { limit, offset } = getPagination(page, size);
  const condition = name
    ? {
        name: { [Op.substring]: name },
        deletedAt: {
          [Op.is]: null,
        },
      }
    : {
        deletedAt: {
          [Op.is]: null,
        },
      };
  const result = await User.findAndCountAll({
    where: condition,
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset,
  });

  return result;
};

exports.getOne = async (req) => {
  const result = await User.findOne({
    where: {
      id: req.params.id,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });
  if (req.params.id && result) {
    return result;
  } else {
    return false;
  }
};
