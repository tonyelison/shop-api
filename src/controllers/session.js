import passport from 'passport';
import { HttpStatus } from '../util/http.js';

const getCurrent = (req, res) => res.json({ ...req.session.passport });

const login = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(HttpStatus.UNAUTHORIZED).send(error);
    if (!user) return res.status(HttpStatus.UNAUTHORIZED).send(info);

    return req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect(HttpStatus.SEE_OTHER, req.originalUrl);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    return res.sendStatus(HttpStatus.NO_CONTENT);
  });
};

export default {
  getCurrent,
  login,
  logout,
};
