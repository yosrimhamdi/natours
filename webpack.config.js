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
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
