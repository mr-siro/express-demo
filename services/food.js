const { Food } = require("../models");
const { Op } = require("sequelize");

exports.create = async (req) => {
  const checkExitFood = await Food.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (!checkExitFood) {
    const food = await Food.create({
      name: req.body.name,
      description: req.body.description,
      FoodTypeId: req.body.FoodTypeId,
    });

    return food;
  } else {
    return false;
  }
};
