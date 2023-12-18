import Router from '../../util/router.js';
import helloController from '../../controllers/hello.js';

const [router, method] = Router();

/*
TEST NESTED ENDPOINTS
*/

method.get(helloController.nestedTest, { isPublic: true });
method.get(helloController.nestedTestDynamic, {
  path: '/:id',
  isPublic: true,
});

method.get(helloController.authNestedTestDynamic, {
  path: '/:id/auth',
});

export default router;
