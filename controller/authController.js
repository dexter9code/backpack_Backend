const User = require("../model/userModel");
const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const logger = require("../utils/logger");
const AppError = require("../utils/AppError");
const sendToken = require("../utils/sendToken");
const catchAsync = require("../utils/catchAsync");

exports.singup = async (req, res, next) => {
  try {
    const user = await User.create(
      pick(req.body, [`name`, `email`, `password`, `confirmPassword`])
    );

    sendToken(user, 201, res);
  } catch (error) {
    logger.log("error", error.message);
  }
};

exports.singin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError(`Please provide Email and password`, 400));

    const user = await User.findOne({ email }).select(`+password`);

    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError(`Invalid email or Password`, 401));

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error.message);
  }
};

exports.Logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true, // we cannot mainpulate the cookie in the browser in any way
    secure: false,
  };
  res.cookie("jwt", "logoutout", cookieOptions);
  res.status(200).json({ status: `Success` });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError(`No User found with this ${email}`, 404));

  const resetToken = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    res.status(200).json({
      status: `Success`,
      message: `Your reset token ${resetToken} only valid for 10 minutes`,
    });
  } catch (error) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(`Error`, 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const receviedToken = req.params.token;
  const hashedToken = crypto
    .createHash("sha256")
    .update(receviedToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError(`Your Reset token is expried `, 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id).select(`+password`);

  if (
    !(await currentUser.correctPassword(
      req.body.currentPassword,
      currentUser.password
    ))
  ) {
    return next(new AppError(`Input Password is incorrect`, 401));
  }

  currentUser.password = req.body.password;
  currentUser.confirmPassword = req.body.confirmPassword;
  await currentUser.save();

  sendToken(currentUser, 200, res);
  next();
});

///*****Routes Protect ************/
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = currentUser;
  next();
});

exports.isLogin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_KEY
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      res.locals.user = currentUser;
      //  req.user = currentUser;
      return next();
    }
  } catch (error) {
    return next();
  }
  next();
};

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`You don't have permission to perform this action`, 403)
      );
    }
    next();
  };
};
