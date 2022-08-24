const express = require(`express`);
const app = express();
const dotenv = require("dotenv");
const globalErrorHandler = require("./controller/errorController");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRoute");

dotenv.config({ path: `${__dirname}/config.env` });

//---------middlesware
app.use(express.static(`${__dirname}/public`));

//bodyParser
app.use(express.json({ limit: `10kb` }));

// router
app.use(`/backpack/api/r1/tours`, tourRouter);
app.use(`/backpack/api/r1/user`, userRouter);
app.use(`/backpack/api/r1/reviews`, reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
