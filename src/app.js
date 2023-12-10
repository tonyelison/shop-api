import express, { urlencoded } from 'express';
import { mongoose } from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import logger from 'morgan';

import passport from './config/passport-config.js';
import appRouter from './config/router-config.js';
import 'dotenv/config';

const { env } = process;

// Connect to mongodb
mongoose.connect(env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// Create express application
const app = express();

// Enable logger
app.use(logger('dev'));

// Enable express sessions
app.use(
  session({
    secret: env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);

// Add user authentication
app.use(passport.initialize());
app.use(passport.session());

// Enable url encoding
app.use(urlencoded({ extended: false }));

// Enable CORS
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));

// Enable JSON parsing
app.use(express.json());

// Add global 'currentUser'
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Add app route paths
app.use(env.API_PATH, appRouter);

// Listen at specified port
app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
