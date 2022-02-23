const { Food } = require("../models");
const foodService = require("../services/food");
exports.create = async (req, res) => {
  const checkExitFood = await Food.findOne({
    where: {
      name: req.body.name,
    },
  });

  try {
    const result = await foodService.create(req);

    if (!result) {
      if (res.status(400) && checkExitFood) {
        return res
          .json({
            success: false,
            message: "Failed! Food is already in use!",
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
      .json({
        success: true,
        message: "create food success!",
        data: result,
      })
      .status(200);
  } catch (error) {
    return res.json({ success: false, message: "Server die" }).status(500);
  }
};
