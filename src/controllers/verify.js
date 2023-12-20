import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../util/http.js';
import User from '../models/user.js';
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

  return res.sendStatus(HttpStatus.OK);
});

export default { verifyToken };
