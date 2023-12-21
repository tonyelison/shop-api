import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import 'dotenv/config';

const { JWT_SECRET, EMAIL_API_KEY, EMAIL_DOMAIN, EMAIL_USER, CLIENT_ORIGIN } =
  process.env;

const mailer = (() => {
  const transporter = nodemailer.createTransport(
    mailgunTransport({
      auth: {
        api_key: EMAIL_API_KEY,
        domain: EMAIL_DOMAIN,
      },
    }),
  );

  const generateToken = (payload) => jwt.sign(payload, JWT_SECRET);

  const sendVerifyEmail = async (user) => {
    const token = generateToken({ user_id: user._id });
    const html = await ejs.renderFile('./src/templates/verify-email.html', {
      user,
      verifyUrl: `${CLIENT_ORIGIN}/register/verify?token=${token}`,
    });

    await transporter.sendMail({
      html,
      // to: `${user.full_name} <${user.username}>`,
      to: `${user.full_name} <tonyelison37@gmail.com>`,
      from: `Shop API Support <${EMAIL_USER}@${EMAIL_DOMAIN}>`,
      subject: 'Please Verify Your Email',
    });
  };

  return { sendVerifyEmail };
})();

export default mailer;
