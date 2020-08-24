const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

const {
  EMAIL_FROM,
  NODE_ENV,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
} = process.env;

class Email {
  constructor(user) {
    this.from = `Yosri Mhamdi <${EMAIL_FROM}>`;
    this.to = user.email;
    this.userName = user.name.split(' ')[0];
    this.transport = this.createTransport();
  }

  createTransport() {
    if (NODE_ENV === 'development') {
      return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      });
    }
  }

  async send(template, subject) {
    const html = pug.renderFile(`views/${template}.pug`, {
      userName: this.userName,
      subject,
    });

    const text = htmlToText.fromString(html);

    await this.transport.sendMail({
      to: this.to,
      from: this.from,
      subject,
      html,
      text,
    });
  }

  async sendWelcome() {
    await this.send('welcome', 'welcome to the Natours family!');
  }
}

module.exports = Email;
