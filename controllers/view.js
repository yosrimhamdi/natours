const tours = require('../apis/server/tours');
const catchAsync = require('../errors/catchAsync');
const AppError = require('../errors/appError');

const getOverview = catchAsync(async (req, res, next) => {
  const response = await tours.get('/');

  res.status(200).render('overview', { title: 'All Tours', tours: response.data.tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const response = await tours.get(`/${req.params.slug}`);

  const { tour } = response.data;

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

module.exports = { getOverview, getTour, getLoginForm };
