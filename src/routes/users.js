import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Router, { Method } from '../util/router.js';
import User from '../models/user.js';

const router = new Router();

router.add(
  Method.GET,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).exec();
    return res.json({ 'user-id': user._id });
  }),
  {
    path: '/:id',
    isProtected: true,
  },
);

router.add(
  Method.POST,
  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, passwordHash) => {
      if (err) return next(err);

      const user = new User({
        username: req.body.username,
        password: passwordHash,
      });
      await user.save();
      return res.sendStatus(201);
    });
  }),
);

export default router;
