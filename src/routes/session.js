import Router from '../util/router.js';
import sessionController from '../controllers/session.js';

const [router, method] = Router();

method.get(sessionController.getCurrent);
method.post(sessionController.login, { isPublic: true });
method.del(sessionController.logout);

export default router;
