import Router, { Method } from '../util/router.js';
import helloController from '../controllers/hello.js';

const router = new Router();

/*
TEST ENDPOINTS
*/

router.add(Method.GET, helloController.test);

router.add(Method.GET, helloController.authTest, {
  path: '/auth',
  isProtected: true,
});

export default router;
