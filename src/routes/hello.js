import router from '../util/route.js';

/*
TEST ENDPOINTS
*/

router('get', '/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router(
  'get',
  '/hello-auth',
  (req, res) => {
    res.json({ message: 'Hello, Authenticated User!' });
  },
  true,
);

export default router;
