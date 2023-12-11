import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User, { UserRole } from '../models/user.js';
import { Status } from '../util/http.js';

const getById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).exec();

  return user
    ? res.json({ 'user-id': user._id })
    : res.sendStatus(Status.NOT_FOUND);
});

const register = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, passwordHash) => {
    if (err) return next(err);

    const user = new User({
      username: req.body.username,
      password: passwordHash,
      role: UserRole.CUSTOMER,
    });
    await user.save();
    return res.sendStatus(Status.CREATED);
  });
});

export default { getById, register };
