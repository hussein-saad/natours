const Review = require('../models/reviewModel');

const handler = require('./handler');

exports.setUserTourIds = (req, res, next) => {
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

exports.getAllReviews = handler.getAll(Review);
exports.getReview = handler.getOne(Review);
exports.createReview = handler.createOne(Review);
exports.updateReview = handler.updateOne(Review);
exports.deleteReview = handler.deleteOne(Review);
