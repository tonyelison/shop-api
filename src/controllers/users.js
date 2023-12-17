import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User, { UserRole } from '../models/user.js';
import { Status } from '../util/http.js';
import mailer from '../services/mailer.js';

const getById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  return user
    ? res.json({ 'user-id': user._id })
    : res.sendStatus(Status.NOT_FOUND);
});

const create = asyncHandler(async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPass,
    role: UserRole.CUSTOMER,
  });

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: 'Username already exists' });
    }
    throw error;
  }

  mailer.send({
    to: 'tonyelison37@gmail.com',
    from: '"Test User" <test@example.com>',
    subject: 'User Created',
    text: 'Hello world!',
  });

  return res.sendStatus(Status.CREATED);
});

export default { getById, create };
