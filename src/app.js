import express, { urlencoded } from 'express';
import { mongoose } from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import logger from 'morgan';

import passport from './config/passport.js';
import router from './util/router.js';
import 'dotenv/config';

import sessionRouter from './routes/session.js';
import usersRouter from './routes/users.js';

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

// Enable url encoding
app.use(urlencoded({ extended: false }));

// Enable CORS
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Enable JSON parsing
app.use(express.json());

// Add global 'currentUser'
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

/*
REST endpoints
*/

const Router = express.Router();

// app.use(
//   router('get', '/hello', (req, res) => {
//     res.json({ message: 'Hello, World!' });
//   })(Router),
// );

// app.use(
//   router(
//     'get',
//     '/hello-auth',
//     (req, res) => {
//       res.json({ message: 'Hello, Authenticated User!' });
//     },
//     true,
//   ),
// );

// app.use(usersRouter);
app.use(sessionRouter(Router));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
