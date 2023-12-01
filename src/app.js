import express, { urlencoded } from 'express';
import { mongoose } from 'mongoose';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import logger from 'morgan';

import passport from './config/passport.js';
import authentication from './config/authentication.js';
import User from './models/user.js';
import 'dotenv/config';

// Connect to mongodb
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Create express application
const app = express();

// Enable logger
app.use(logger('dev'));

// Enable express sessions
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);

// Add user authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(authentication.verify());

// Enable url encoding
app.use(urlencoded({ extended: false }));

// Enable CORS
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

// Enable JSON parsing
app.use(express.json());

// Add global 'currentUser'
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Declare rest endpoints
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/authenticated', (req, res) => {
  res.json({ message: 'User is authenticated!' });
});

app.get('/api/session', (req, res) => {
  res.json({ message: 'session object goes here' });
});

app.get('/api/login-failure', (req, res) => {
  res.status(500).json({ error: 'Failed to log in!' });
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
      return res.json({ 'user-id': user._id });
    } catch (e) {
      return next(e);
    }
  });
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return res.status(401).send(error);
    }
    if (!user) {
      return res.status(401).send(info);
    }

    return req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ 'user-id': user._id });
    });
  })(req, res, next);
});

app.post('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.json({ message: 'successfully logged out' });
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
