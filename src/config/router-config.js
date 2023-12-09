import express from 'express';
import helloRouter from '../routes/hello.js';
import sessionRouter from '../routes/session.js';

const router = express.Router();

router.use('/hello', helloRouter);
router.use('/session', sessionRouter);

export default router;
