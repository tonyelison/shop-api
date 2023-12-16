import Router from '../util/router.js';
import { Method } from '../util/http.js';
import usersController from '../controllers/users.js';

const router = new Router();

router.add(Method.GET, usersController.getById, { path: '/:id' });
router.add(Method.POST, usersController.create, { isPublic: true });

export default router;
