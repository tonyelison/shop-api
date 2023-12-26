import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// passport.authenticate()
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  const sessionUser = {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    active: user.active,
  };

  done(null, sessionUser);
});

passport.deserializeUser(async (sessionUser, done) => {
  try {
    const user = await User.findById(sessionUser.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
