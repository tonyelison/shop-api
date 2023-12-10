import Router from '../util/router.js';
import { Method } from '../util/http.js';
import helloController from '../controllers/hello.js';

const router = new Router();

/*
TEST ENDPOINTS
*/

router.add(Method.GET, helloController.test, { isPublic: true });
router.add(Method.GET, helloController.authTest, { path: '/auth' });

export default router;
