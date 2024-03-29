const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// routers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const foodRouter = require("./routes/food");
const cors = require("cors");
const db = require("./models");
const dotenv = require("dotenv");
// defined database
db.sequelize.sync();

const corsOptions = {
  origin: "http://localhost:3000",
};

dotenv.config();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routers
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/food", foodRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
