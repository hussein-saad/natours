const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    user: req.body.user,
    tour: req.body.tour,
  });

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
