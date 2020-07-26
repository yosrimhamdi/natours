const express = require('express');
const morgan = require('morgan');
const rateLimiter = require('express-rate-limit');
const tourRouter = require('./routers/tour');
const userRouter = require('./routers/user');
const globalErrHandler = require('./errors/globalErrHandler');
const route404 = require('./errors/route404');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests for this IP',
});

app.use('/api', limiter);

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

app.all('*', route404);

app.use(globalErrHandler);

module.exports = app;
