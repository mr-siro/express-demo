const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/user");

// user
usersRouter.get("/", usersController.getAll);
usersRouter.get("/:id", usersController.getOne);
usersRouter.post("/", usersController.create);
usersRouter.put("/:id", usersController.update);
usersRouter.delete("/:id", usersController.delete);

module.exports = usersRouter;
