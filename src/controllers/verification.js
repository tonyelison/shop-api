import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../util/http.js';
import User from '../models/user.js';
import mailer from '../services/mailer.js';
import 'dotenv/config';

const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) return res.sendStatus(HttpStatus.UNAUTHORIZED);

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken.user_id).exec();
    if (!user.active) {
      user.active = true;
      await user.save();
    }
  } catch (err) {
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  }

  return res.sendStatus(HttpStatus.NO_CONTENT);
});

const resendEmail = asyncHandler(async (req, res) => {
  const userId = req.session.passport.user;
  if (!userId) return res.sendStatus(HttpStatus.UNAUTHORIZED);

  const user = await User.findById(userId).exec();
  mailer.sendVerifyEmail(user);

  return res.sendStatus(HttpStatus.NO_CONTENT);
});

export default { verifyToken, resendEmail };
