const jwt = require("jsonwebtoken");

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, statusCode, res) => {
  const token = createJWT(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // we cannot mainpulate the cookie in the browser in any way
    secure: false,
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: `Success`,
    token,
    data: { name: user.name, email: user.email, photo: user.photo },
  });
};

module.exports = sendToken;
