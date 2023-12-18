import Router from '../util/router.js';
import productsController from '../controllers/products.js';

const [router, method] = Router();

method.get(productsController.getAll, { isPublic: true });
method.get(productsController.getById, {
  path: '/:id',
  isPublic: true,
});
method.post(productsController.create);

export default router;
