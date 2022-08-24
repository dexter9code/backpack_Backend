const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controller/reviewController");
const authController = require("../controller/authController");

router
  .route(`/`)
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrict("admin", `user`),
    reviewController.createReview
  );

router.use(authController.protect, authController.restrict("admin", "user"));
router
  .route(`/:reviewId`)
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
