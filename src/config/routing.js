import express from 'express';
import helloRouter from '../routes/hello.js';
import sessionRouter from '../routes/session.js';
import usersRouter from '../routes/users.js';
import verificationRouter from '../routes/verification.js';
import productsRouter from '../routes/products.js';

const router = express.Router();

router.use('/hello', helloRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/verification', verificationRouter);
router.use('/products', productsRouter);

export default router;
