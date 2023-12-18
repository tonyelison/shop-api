import Router from '../util/router.js';
import { HttpMethod } from '../util/http.js';
import sessionController from '../controllers/session.js';

const router = new Router();

router.add(HttpMethod.GET, sessionController.getCurrent);
router.add(HttpMethod.POST, sessionController.login, { isPublic: true });
router.add(HttpMethod.DELETE, sessionController.logout);

export default router;
