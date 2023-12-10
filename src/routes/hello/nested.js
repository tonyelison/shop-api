import Router from '../../util/router.js';
import { Method } from '../../util/http.js';
import helloController from '../../controllers/hello.js';

const router = new Router();

/*
TEST NESTED ENDPOINTS
*/

router.add(Method.GET, helloController.nestedTest, { isPublic: true });
router.add(Method.GET, helloController.nestedTestDynamic, {
  path: '/:id',
  isPublic: true,
});

router.add(Method.GET, helloController.authNestedTestDynamic, {
  path: '/:id/auth',
});

export default router;
