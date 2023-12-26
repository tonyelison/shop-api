import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User, { UserRole } from '../models/user.js';
import { HttpStatus } from '../util/http.js';
import mailer from '../services/mailer.js';

const getById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  return user
    ? res.json({ 'user-id': user._id })
    : res.sendStatus(HttpStatus.NOT_FOUND);
});

const create = asyncHandler(async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPass,
    role: UserRole.CUSTOMER,
    active: false,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(HttpStatus.INTERNAL_SERVICE_ERROR)
        .json({ message: 'Username already exists' });
    }
    throw error;
  }

  mailer.sendVerifyEmail(user);

  return res.sendStatus(HttpStatus.CREATED);
});

export default { getById, create };
