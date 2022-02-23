const express = require("express");
const foodRouter = express.Router();
const foodController = require("../controllers/food");
const { authJwt } = require("../middlewares");
foodRouter.post("/create", [authJwt.verifyToken], foodController.create);
module.exports = foodRouter;
