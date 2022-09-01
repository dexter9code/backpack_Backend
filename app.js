const express = require(`express`);
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controller/errorController");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");
const viewRouter = require("./routes/viewRoute");

dotenv.config({ path: `${__dirname}/config.env` });

//---------middlesware
app.use(express.static(`${__dirname}/public`));
app.use(cors());
//bodyParser
app.use(express.json({ limit: `10kb` }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
// template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// router
app.use(`/`, viewRouter);
app.use(`/backpack/api/r1/tours`, tourRouter);
app.use(`/backpack/api/r1/user`, userRouter);
app.use(`/backpack/api/r1/reviews`, reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
