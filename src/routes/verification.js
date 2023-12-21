import Router from '../util/router.js';
import verificationController from '../controllers/verification.js';

const [router, method] = Router();

method.post(verificationController.verifyToken, { isPublic: true });

export default router;
