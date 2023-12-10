import Router from '../util/router.js';
import { Method } from '../util/http.js';
import sessionController from '../controllers/session.js';

const router = new Router();

router.add(Method.GET, sessionController.getCurrent);
router.add(Method.POST, sessionController.login, { isPublic: true });
router.add(Method.DELETE, sessionController.logout);

export default router;
