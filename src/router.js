import express from 'express';
import sessionRouter from './routes/session.js';

const router = express.Router();

router.use('/session', sessionRouter);

export default router;
