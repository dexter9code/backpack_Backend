const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Tour name is required`],
      unique: true,
      maxLength: [40, `Maximum Limit reached`],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, `Price is requred `],
      min: 1,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: `Discount cannot larger than actual ${this.price} price`,
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      min: 1,
      required: [true, `Tour must have duration`],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, `Tour must have a summary`],
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    tourImage: { type: String, required: [true, `Tour must have a image`] },
    images: [String],
    createdAt: { type: Date, default: Date.now() },
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: `Review`,
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

// virtual fields in documents
tourSchema.virtual("priceInUSD").get(function () {
  return this.price * 0.013;
});

tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

// pre-post hooks
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "name email role photo ",
  });
  next();
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
