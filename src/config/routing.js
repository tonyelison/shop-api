import express from 'express';
import helloRouter from '../routes/hello.js';
import sessionRouter from '../routes/session.js';
import usersRouter from '../routes/users.js';
import productsRouter from '../routes/products.js';

const router = express.Router();

router.use('/hello', helloRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

export default router;
