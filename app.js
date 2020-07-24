const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tour');
const userRouter = require('./routers/user');
const globalErrHandler = require('./errors/globalErrHandler');
const route404 = require('./errors/route404');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

app.all('*', route404);

app.use(globalErrHandler);

module.exports = app;
