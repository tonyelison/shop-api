import Router from '../util/router.js';

const [router, method] = Router();

// TODO: implement email token verification
method.get((req, res) => res.json({ message: 'Email verified!' }), {
  isPublic: true,
});

export default router;
