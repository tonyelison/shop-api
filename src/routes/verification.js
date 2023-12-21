import Router from '../util/router.js';
import verificationController from '../controllers/verification.js';

const [router, method] = Router();

method.post(verificationController.verifyToken, { isPublic: true });
method.post(verificationController.resendEmail, { path: '/resend-email' });

export default router;
