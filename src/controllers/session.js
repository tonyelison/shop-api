import passport from 'passport';
import { Status } from '../util/http.js';

const getCurrent = (req, res) => {
  const creds = req.session.passport;
  return creds ? res.json({ ...creds }) : res.sendStatus(Status.NOT_FOUND);
};

const login = (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(Status.UNAUTHORIZED).send(error);
    if (!user) return res.status(Status.UNAUTHORIZED).send(info);

    return req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect(Status.SEE_OTHER, req.originalUrl);
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    return res.sendStatus(Status.NO_CONTENT);
  });
};

export default {
  getCurrent,
  login,
  logout,
};
