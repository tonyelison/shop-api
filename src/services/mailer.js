import nodemailer from 'nodemailer';
import 'dotenv/config';

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

const mailer = (() => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const send = async ({ to, from, subject, text, html }) => {
    await transporter.sendMail({
      to,
      from,
      subject,
      text,
      html,
    });
  };

  return { send };
})();

export default mailer;
