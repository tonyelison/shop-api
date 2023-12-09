import Router, { Method } from '../util/router.js';

const router = new Router();

/*
TEST ENDPOINTS
*/

router.add(Method.GET, (req, res) => res.json({ message: 'Hello, World!' }));

router.add(
  Method.GET,
  (req, res) => res.json({ message: 'Hello, Authenticated User!' }),
  { path: '/auth', isProtected: true },
);

export default router;
