import express, { urlencoded } from "express";
import path from "path";
import { mongoose, Schema } from 'mongoose';
import session from "express-session";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import 'dotenv/config';

const User = mongoose.model(
  "User",
  new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  })
);

// Connect to Mongo DB
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Create Express Application
const app = express();

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));

// passport.authenticate()
passport.use(
  new LocalStrategy({ usernameField: 'username', passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
      }

      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({ extended: false }));

const checkAuthentication = (publicRoutes = []) => (req, res, next) => {
  if (req.isAuthenticated() || publicRoutes.includes(req.path)) {
    next();
    return;
  }
  res.sendStatus(403);
};

 // Declare Public Endpoints
app.use(checkAuthentication([
  '/api/hello',
  '/api/signup',
  '/api/login',
  '/api/logout',
  '/api/login-failure'
]));

// Add Global 'currentUser'
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('/api/hello', (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get('/api/authenticated', (req, res) => {
  res.json({ message: "User is authenticated!" });
});

app.get('/api/login-failure', (req, res) => {
  res.json({ message: "Failed to log in!" });
});

app.post("/api/signup", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    try {
      const user = new User({
        username: req.body.username,
        password: passwordHash
      });
      await user.save();
      res.send("successfully added the following user: " + user.username);
    } catch(err) {
      return next(err);
    };
  });
});

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/authenticated",
    failureRedirect: "/api/login-failure"
  })
);

app.post("/api/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("successfully logged out");
  });
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
