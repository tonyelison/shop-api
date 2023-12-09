import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
// import auth from '../util/route-builder-old.js';

const router = express.Router();

router.get(
  '/:id',
  // auth.verify,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).exec();
    return res.json({ 'user-id': user._id });
  }),
);

router.post(
  '/',
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
