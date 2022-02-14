var express = require("express");
var router = express.Router();
const userController = require("../src/controllers/user.controller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/users", userController.create);
router.delete("/users/:id", userController.delete);
router.put("/users/:id", userController.update);
router.get("/users", userController.getAll);
module.exports = router;
