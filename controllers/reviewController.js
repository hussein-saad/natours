const Review = require('../models/reviewModel');

const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find(
    req.params.tourId ? { tour: req.params.tourId } : {},
  );

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
    user: req.body.user || req.user.id,
    tour: req.body.tour || req.params.tourId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      review,
    },
  });
});
