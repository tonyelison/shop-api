import Router from '../util/router.js';
import verifyController from '../controllers/verify.js';

const [router, method] = Router();

method.get(verifyController.verifyToken, { isPublic: true });

export default router;
