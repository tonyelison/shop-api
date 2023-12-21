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

  const sendVerifyEmail = async (user, mailOptions) => {
    const html = await ejs.renderFile('./src/templates/verify-email.html', {
      user,
      verifyUrl: `${CLIENT_ORIGIN}/register/verify?token=${generateToken({
        user_id: user._id,
      })}`,
    });

    await transporter.sendMail({
      html,
      from: `Shop API Support <${EMAIL_USER}@${EMAIL_DOMAIN}>`,
      ...mailOptions,
    });
  };

  return { sendVerifyEmail };
})();

export default mailer;
