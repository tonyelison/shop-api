import passport from 'passport';
import router from '../util/route.js';

const PATH = '/session';

router('get', PATH, (req, res) => {
  const creds = req.session.passport;
  return creds ? res.json({ ...creds }) : res.sendStatus(404);
});

router('post', PATH, (req, res, next) => {
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
      return res.redirect(303, req.originalUrl);
    });
  })(req, res, next);
});

router('delete', PATH, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.json({ message: 'successfully logged out' });
  });
});

export default router;
