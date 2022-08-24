const Review = require("../model/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().select(`-__v`);

  res.status(200).json({
    status: `Success`,
    length: reviews.length,
    data: { reviews },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const review = await Review.findById(id).select(`-__v`);

  if (!review) return next(new AppError(`Invalid ${id} provided`));

  res.status(200).json({
    status: `Success`,
    data: { review },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const tourId = req.params.tourId;
  const userId = req.user.id;

  if (!req.body.tour) req.body.tour = tourId;
  if (!req.body.user) req.body.user = userId;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: `Success`,
    data: { review },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const review = await Review.findById(id);

  if (!review) return next(new AppError(`Invalid ${id} provided`));

  review.review = req.body.review;
  review.rating = req.body.rating;
  await review.save();

  res.status(200).json({
    status: `Success`,
    data: { review },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const review = await Review.findByIdAndDelete(id);

  if (!review) return next(new AppError(`Invalid ${id} provided`));

  res.status(204).json({
    status: `Success`,
    data: null,
  });
});
