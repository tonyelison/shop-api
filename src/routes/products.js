import Router from '../util/router.js';
import { HttpMethod } from '../util/http.js';
import productsController from '../controllers/products.js';

const router = new Router();

router.add(HttpMethod.GET, productsController.getAll, { isPublic: true });
router.add(HttpMethod.GET, productsController.getById, {
  path: '/:id',
  isPublic: true,
});
router.add(HttpMethod.POST, productsController.create);

export default router;
