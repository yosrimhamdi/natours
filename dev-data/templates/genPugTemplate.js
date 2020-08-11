const html2pug = require('html2pug');
const fs = require('fs');

const overview = fs.readFileSync(`${__dirname}/public/overview.html`, 'utf-8');

const pugOverview = html2pug(overview);

fs.writeFile(`${__dirname}/views/base.pug`, pugOverview, err => {
  console.log(err);
});
