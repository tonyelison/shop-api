import Router from '../util/router.js';
import helloController from '../controllers/hello.js';
import nestedHelloRouter from './hello/nested.js';

const [router, method] = Router();

/*
TEST ENDPOINTS
*/

method.get(helloController.test, { isPublic: true });
method.get(helloController.authTest, { path: '/auth' });

router.use('/nested', nestedHelloRouter);

export default router;
