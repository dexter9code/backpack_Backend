const express = require(`express`);
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const globalErrorHandler = require("./controller/errorController");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");

dotenv.config({ path: `${__dirname}/config.env` });

//---------middlesware
app.use(express.static(`${__dirname}/public`));
app.use(cors());
//bodyParser
app.use(express.json({ limit: `10kb` }));

// template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// router
app.get(`/base`, (req, res) => {
  res.status(200).render("base", { title: "Backpack" });
});

app.use(`/backpack/api/r1/tours`, tourRouter);
app.use(`/backpack/api/r1/user`, userRouter);
app.use(`/backpack/api/r1/reviews`, reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
