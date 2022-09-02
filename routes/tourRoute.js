const express = require("express");
const router = express.Router();
const tourController = require("../controller/tourController");
const userController = require("../controller/authController");
const reviewRouter = require(`./reviewRoute`);

router.use(`/:tourId/reviews`, reviewRouter);

router.route(`/`).get(tourController.getAllTours);

router
  .route(`/addTour`)
  .post(
    userController.protect,
    userController.restrict("admin", "guide"),
    tourController.addTour
  );

router
  .route(`/:tourId`)
  .get(tourController.getTour)
  .patch(
    userController.protect,
    userController.restrict("admin", "guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.editTour
  )
  .delete(
    userController.protect,
    userController.restrict("admin"),
    tourController.deleteTour
  );

module.exports = router;
