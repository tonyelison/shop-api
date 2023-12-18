import Router from '../util/router.js';
import { HttpMethod } from '../util/http.js';
import helloController from '../controllers/hello.js';
import nestedHelloRouter from './hello/nested.js';

const router = new Router();

/*
TEST ENDPOINTS
*/

router.add(HttpMethod.GET, helloController.test, { isPublic: true });
router.add(HttpMethod.GET, helloController.authTest, { path: '/auth' });

router.use('/nested', nestedHelloRouter);

export default router;
