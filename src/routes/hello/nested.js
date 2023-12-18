import Router from '../../util/router.js';
import { HttpMethod } from '../../util/http.js';
import helloController from '../../controllers/hello.js';

const router = new Router();

/*
TEST NESTED ENDPOINTS
*/

router.add(HttpMethod.GET, helloController.nestedTest, { isPublic: true });
router.add(HttpMethod.GET, helloController.nestedTestDynamic, {
  path: '/:id',
  isPublic: true,
});

router.add(HttpMethod.GET, helloController.authNestedTestDynamic, {
  path: '/:id/auth',
});

export default router;
