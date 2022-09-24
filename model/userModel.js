const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, `Should be more than 2 character`],
    trim: true,
    required: [true, `Name is required`],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, `Please provide valide email `],
    required: [true, `Email is required and can't be empty`],
  },
  photo: { type: String, default: "default.jpg" },
  role: {
    type: String,
    emum: ["user", "guide", "admin", "assistance"],
    default: "user",
  },
  password: {
    type: String,
    minLength: [5, `Password length is too short`],
    required: [true, `Password can't be empty`],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: `Password and confirm password doesnot match`,
    },
    required: [true, `Password is required`],
  },
  userCreatedAt: { type: Date, default: Date.now() },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// instance methods
userSchema.methods.correctPassword = async function (realPass, userPass) {
  return await bcrypt.compare(realPass, userPass);
};

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
