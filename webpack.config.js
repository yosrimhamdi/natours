module.exports = {
  entry: {
    login: './public/js/login.js',
    logout: './public/js/logout.js',
    mapbox: './public/js/mapbox.js',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/public/js/bundle`,
  },
  mode: 'development',
  watch: true,
};
