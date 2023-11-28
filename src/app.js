import express, { urlencoded } from 'express';
import { mongoose } from 'mongoose';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import passport from './config/passport.js';
import authentication from './config/authentication.js';
import User from './models/user.js';
import 'dotenv/config';

// Connect to Mongo DB
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Create Express Application
const app = express();

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(authentication.verify());
app.use(urlencoded({ extended: false }));

// Add Global 'currentUser'
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/authenticated', (req, res) => {
  res.json({ message: 'User is authenticated!' });
});

app.get('/api/login-failure', (req, res) => {
  res.json({ message: 'Failed to log in!' });
});

app.post('/api/signup', async (req, res, next) => {
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
      return res.send(`successfully added the following user: ${user.username}`);
    } catch (e) {
      return next(e);
    }
  });
});

app.post(
  '/api/login',
  passport.authenticate('local', {
    successRedirect: '/api/authenticated',
    failureRedirect: '/api/login-failure',
  }),
);

app.post('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.send('successfully logged out');
  });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
