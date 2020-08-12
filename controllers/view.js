const axios = require('axios');

const getOverview = async (req, res, next) => {
  const response = await axios.get('http://localhost:3000/api/tours');

  const { tours } = response.data.data;

  console.log(tours);

  res.status(200).render('overview', { title: 'All Tours', tours });
};

const getTour = (req, res, next) => {
  res.status(200).render('tour');
};

module.exports = { getOverview, getTour };
