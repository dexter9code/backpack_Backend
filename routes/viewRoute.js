const express = require("express");
const router = express.Router();

const viewController = require("../controller/viewController");
const authController = require("../controller/authController");

router.route(`/base`).get(viewController.getBase);
router.route(`/login`).get(viewController.getLogin);
router
  .route(`/overview`)
  .get(authController.protect, viewController.getOverview);

module.exports = router;
