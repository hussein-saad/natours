const mongoose = require('mongoose');

const Tour = require('./tourModel');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

reviewSchema.statics.calcNumOfRatingsAndAVG = async function (tour) {
  const stats = await this.aggregate([
    {
      $match: { tour },
    },
    {
      $group: {
        _id: '$tour',
        numRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  await Tour.findByIdAndUpdate(tour, {
    ratingsQuantity: stats.length > 0 ? stats[0].numRating : 0,
    ratingsAverage: stats.length > 0 ? stats[0].avgRating : 4.5,
  });
};

reviewSchema.post('save', function () {
  this.constructor.calcNumOfRatingsAndAVG(this.tour);
});

async function updateReviewStats(doc, next) {
  if (doc) {
    await doc.constructor.calcNumOfRatingsAndAVG(doc.tour);
  }
  next();
}

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  await updateReviewStats(doc, next);
});

reviewSchema.post('remove', async function (doc, next) {
  await updateReviewStats(doc, next);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
