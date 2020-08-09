const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tour');
const User = require('../../models/user');
const Review = require('../../models/review');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

const DATABASE =
  'mongodb+srv://yosri:WxeZF1f1ZOr4LaUP@cluster0.urxdn.mongodb.net/natours?retryWrites=true&w=majority';

(async () => {
  await mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await Tour.deleteMany();
  await User.deleteMany();
  await Review.deleteMany();

  await Tour.create(tours);
  await User.create(users, { validateBeforeSave: false });
  await Review.create(reviews);

  console.log('done');
  process.exit(0);
})();
