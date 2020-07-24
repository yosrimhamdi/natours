const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: 'A tour must have a name',
    },
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
    validate: {
      validator(price) {
        return price > 0;
      },
      message: 'The price must be positive',
    },
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
