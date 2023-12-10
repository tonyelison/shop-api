import Router, { Method } from '../util/router.js';
import usersController from '../controllers/users.js';

const router = new Router();

router.add(Method.GET, usersController.getById, {
  path: '/:id',
  isProtected: true,
});

router.add(Method.POST, usersController.register);

export default router;
