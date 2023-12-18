import Router from '../util/router.js';
import usersController from '../controllers/users.js';

const [router, method] = Router();

method.get(usersController.getById, { path: '/:id' });
method.post(usersController.create, { isPublic: true });

export default router;
