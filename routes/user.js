const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/user");

const { authJwt } = require("../middlewares");
// user
usersRouter.get("/", [authJwt.verifyToken], usersController.getAll);
usersRouter.get("/:id", [authJwt.verifyToken], usersController.getOne);
usersRouter.post("/signup", usersController.signup);
usersRouter.put("/:id", [authJwt.verifyToken], usersController.update);
usersRouter.delete("/:id", [authJwt.verifyToken], usersController.delete);
usersRouter.post("/signin", usersController.signin);
module.exports = usersRouter;
