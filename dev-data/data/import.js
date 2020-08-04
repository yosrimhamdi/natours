const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../models/tour');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));

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

  tours.forEach(async (tour) => await Tour.create(tour));
})();
