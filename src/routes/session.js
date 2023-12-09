import passport from 'passport';
import Router, { Method } from '../util/router.js';

const router = new Router();

router.add(Method.GET, (req, res) => {
  const creds = req.session.passport;
  return creds ? res.json({ ...creds }) : res.sendStatus(404);
});

router.add(Method.POST, (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) return res.status(401).send(error);
    if (!user) return res.status(401).send(info);

    return req.logIn(user, (err) => {
      if (err) return next(err);

      return res.redirect(303, req.originalUrl);
    });
  })(req, res, next);
});

router.add(Method.DELETE, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    return res.json({ message: 'successfully logged out' });
  });
});

export default router;
