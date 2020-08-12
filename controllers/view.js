const tours = require('../apis/tours');
const catchAsync = require('../errors/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  const response = await tours.get('/');

  res.status(200).render('overview', { title: 'All Tours', tours: response.data });
});

const getTour = catchAsync(async (req, res, next) => {
  const response = await tours.get(`/${req.params.slug}`);

  const { tour } = response.data;

  res.status(200).render('tour', { title: tour.name, tour });
});

module.exports = { getOverview, getTour };
