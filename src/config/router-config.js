import express from 'express';
import helloRouter from '../routes/hello.js';
import sessionRouter from '../routes/session.js';
import usersRouter from '../routes/users.js';

const router = express.Router();

router.use('/hello', helloRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

export default router;
