const Tour = require("../model/tourModel");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/Features");
const catchAsync = require(`../utils/catchAsync`);
const logger = require("../utils/logger");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(`Not a image file`, 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTourImages = upload.fields([
  { name: "tourImage", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.tourImage || !req.files.images) return next();

  // cover image
  const coverImage = `tour-${req.params.tourId}-${Date.now()}-cover.jpeg`;

  console.log(req.files);

  await sharp(req.files.tourImage[0].buffer)
    .resize(2000, 1333) //3:2
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${coverImage}`);

  req.body.tourImage = `http://localhost:8080/img/tours/${coverImage}`;

  // // images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const imagesFileName = `tour-${req.params.tourId}-${Date.now()}-${
        i + 1
      }.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333) //3:2
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${imagesFileName}`);

      req.body.images.push(`http://localhost:8080/img/tours/${imagesFileName}`);
    })
  );

  next();
});

exports.getAllTours = async (req, res, next) => {
  try {
    const features = new APIFeatures(Tour, req.query)
      .filter()
      .sort()
      .pagination();

    const tours = await features.query;

    res.status(200).json({
      status: `Success`,
      length: tours.length,
      data: { tours },
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const id = req.params.tourId;
    let query = Tour.findById(id).populate("reviews").select(`-__v`);

    if (!query) return next(new AppError(`Invalid id provided `, 400));

    const tour = await query;

    res.status(200).json({
      status: `Success`,
      data: { tour },
    });
  } catch (error) {
    logger.log("error", error.message);
  }
};

exports.addTour = async (req, res, next) => {
  const tour = await Tour.create(req.body);

  res.status(201).json({
    status: `Success`,
    data: { tour },
  });
};

exports.editTour = async (req, res, next) => {
  try {
    const id = req.params.tourId;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select(`-__v`);

    if (!tour)
      return next(new AppError(`cant find the document with ${id}`, 404));

    res.status(200).json({
      status: `Success`,
      data: { tour },
    });
  } catch (error) {
    logger.log("error", error.message);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const id = req.params.tourId;
    const tour = await Tour.findByIdAndDelete(id);

    if (!tour)
      return next(new AppError(`cant find the document with ${id}`, 404));

    res.status(204).json({
      status: `Success`,
      data: null,
    });
  } catch (error) {
    logger.log("error", error.message);
  }
};
