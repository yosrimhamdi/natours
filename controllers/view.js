const tours = require('../apis/server/tours');
const catchAsync = require('../errors/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  const response = await tours.get('/');

  res.status(200).render('overview', { title: 'All Tours', tours: response.data.tours });
});

const getTour = catchAsync(async (req, res, next) => {
  const response = await tours.get(`/${req.params.slug}`);

  const { tour } = response.data;

  res.status(200).render('tour', { title: tour.name, tour });
});

const getLoginForm = (req, res) => {
  res.status(200).render('login', { title: 'Login' });
};

module.exports = { getOverview, getTour, getLoginForm };
