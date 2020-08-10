const mongoose = require('mongoose');
const Tour = require('./tour');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, 'rating is a must'],
    min: [1, 'must be >= 1'],
    max: [5, 'must be <= 5'],
  },
  review: {
    type: String,
    required: [true, 'need a message'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Tour must belong to a tour'],
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate('user');

  next();
});

reviewSchema.post(/(save|remove)/, async function () {
  const [stats] = await this.constructor.calcAverageRating(this.tour);

  await this.constructor.setAverageRating(stats);
});

reviewSchema.statics.setAverageRating = async function (stats) {
  const { _id: tourId, ratingsQuantity, ratingsAverage } = stats;

  await Tour.findByIdAndUpdate(tourId, { ratingsQuantity, ratingsAverage });
};

reviewSchema.statics.calcAverageRating = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: '$rating' },
      },
    },
  ]);

  return stats;
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
