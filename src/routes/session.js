import Router, { Method } from '../util/router.js';
import sessionController from '../controllers/session.js';

const router = new Router();

router.add(Method.GET, sessionController.getCurrent);
router.add(Method.POST, sessionController.login);
router.add(Method.DELETE, sessionController.logout);

export default router;
