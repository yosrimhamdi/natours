module.exports = {
  entry: {
    login: './public/js/assets/login.js',
    logout: './public/js/assets/logout.js',
    mapbox: './public/js/assets/mapbox.js',
    account: './public/js/assets/account/account.js',
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
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
