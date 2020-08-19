const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');
const Tour = require('../models/tour');

const getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', { title: 'All Tours', tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug });

  if (!tour) {
    return next(
      new AppError(`no tour with name: ${req.params.slug.replace(/-/g, ' ')}.`, 404)
    );
  }

  res.status(200).render('tour', { title: tour.name, tour });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', { title: 'Login' });
};

const getUserAccount = (req, res) => {
  res.status(200).render('account', { title: 'Account' });
};

module.exports = { getOverview, getTour, getLoginForm, getUserAccount };
