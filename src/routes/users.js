import Router from '../util/router.js';
import { HttpMethod } from '../util/http.js';
import usersController from '../controllers/users.js';

const router = new Router();

router.add(HttpMethod.GET, usersController.getById, { path: '/:id' });
router.add(HttpMethod.POST, usersController.create, { isPublic: true });

export default router;
