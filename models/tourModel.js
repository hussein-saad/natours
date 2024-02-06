const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [32, 'a tour name must have less or equal than 32 characters'],
      minlength: [5, 'a tour name must have more or equal than 5 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: true[(true, 'a tour must have a group size')],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either: easy, medium, difficult',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1'],
      max: [5, 'rating must be below 5'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
      min: [0, 'rating quantity must be above 0'],
    },
    price: {
      type: Number,
      required: [true, 'a tour must have a price'],
      min: [0, 'price must be above 0'],
    },

    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a summary'],
    },

    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a cover image'],
    },
    images: [String],

    startDates: [Date],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7, 2;
});

module.exports = mongoose.model('Tour', tourSchema);