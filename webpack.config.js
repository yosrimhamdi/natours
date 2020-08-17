const fs = require('fs');
const path = require('path');

const entries = fs.readdirSync(path.join(__dirname, 'public/js'));

const entry = {};

entries.forEach(ent => {
  if (ent.includes('js')) {
    entry[ent.slice(0, -3)] = `./public/js/${ent}`;
  }
});

module.exports = {
  entry,
  output: {
    filename: '[name].js',
    path: `${__dirname}/public/js/bundle`,
  },
  mode: 'development',
  watch: true,
};
