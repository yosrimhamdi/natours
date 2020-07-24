const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path: './config.env',
});

const { DATABASE, PORT } = process.env;

(async () => {
  await mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log('connected to database');
})();

const app = require('./app');

app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`);
});
