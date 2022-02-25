const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { checkExitedUser } = require("../common/function");

exports.postLogin = [
  body("email")
    .isEmail()
    .withMessage("Email không đúng định dạng.")
    .custom(async (value) => {
      const user = await checkExitedUser(value);

      if (!user) {
        throw new Error("Tài khoản không tồn tại.");
      }

      return true;
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Vui lòng nhập mật khẩu.")
    .isLength(8)
    .withMessage("Mật khẩu phải đủ 8 kí tự.")
    .custom(async (value, { req }) => {
      const user = await checkExitedUser(req.body.email);
      const passwordIsValid = bcrypt.compareSync(value, user.password);
      if (!passwordIsValid) {
        throw new Error("Mật khẩu không đúng.");
      }

      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    } else {
      next();
    }
  },
];

exports.postSignup = [
  body("email")
    .isEmail()
    .withMessage("Email không đúng định dạng.")
    .custom(async (value) => {
      const user = await checkExitedUser(value);

      if (user) {
        throw new Error("Tài khoản đã tồn tại.");
      }

      return true;
    }),
  body("name")
    .not()
    .isEmpty()
    .withMessage("Vui lòng nhập tên.")
    .trim()
    .isLength({ max: 30 })
    .withMessage("Nhập tên tối đa 30 kí tự."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Vui lòng nhập mật khẩu.")
    .isLength(8)
    .withMessage("Mật khẩu phải đủ 8 kí tự."),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    } else {
      next();
    }
  },
];
