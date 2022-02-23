const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user");

const { authJwt } = require("../middlewares");
// user
userRouter.get("/", [authJwt.verifyToken], userController.getAll);
userRouter.get("/:id", [authJwt.verifyToken], userController.getOne);
userRouter.post("/signup", userController.signup);
userRouter.put("/:id", [authJwt.verifyToken], userController.update);
userRouter.delete("/:id", [authJwt.verifyToken], userController.delete);
userRouter.post("/signin", userController.signin);
module.exports = userRouter;
