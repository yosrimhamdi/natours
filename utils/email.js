const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  const { to, subject, message } = options;
  const { EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_HOST, EMAIL_PORT } = process.env;

  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    from: 'Yosri Mhamdi <bavary1515@gmail.com>',
    to,
    subject,
    text: message,
  });
};

module.exports = sendMail;
