import Router from '../util/router.js';
import { Method } from '../util/http.js';
import productsController from '../controllers/products.js';

const router = new Router();

router.add(Method.GET, productsController.getAll);
router.add(Method.GET, productsController.getById, { path: '/:id' });
router.add(Method.POST, productsController.create);

export default router;
