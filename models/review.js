const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;