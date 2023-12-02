import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (/* req, res, next */) => {
  // TODO
});

router.post('/', async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    try {
      const user = new User({
        username: req.body.username,
        password: passwordHash,
      });
      await user.save();
      return res.json({ 'user-id': user._id });
    } catch (e) {
      return next(e);
    }
  });
});

export default router;
