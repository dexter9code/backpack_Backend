const express = require("express");
const router = express.Router();
const currentUserController = require("../controller/userController");
const userController = require("../controller/authController");

router.route(`/singup`).post(userController.singup);
router.route(`/login`).post(userController.singin);

router
  .route(`/updatePassword`)
  .patch(userController.protect, userController.updatePassword);

router
  .route(`/updateMe`)
  .patch(
    userController.protect,
    currentUserController.uploadUserPhoto,
    currentUserController.resizeUserImage,
    currentUserController.updateMe
  );

router.route(`/forgotPassword`).post(userController.forgotPassword);
router.route(`/resetPassword/:token`).patch(userController.resetPassword);

module.exports = router;
