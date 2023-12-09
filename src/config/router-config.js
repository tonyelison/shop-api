import express from 'express';
import sessionRouter from '../routes/session.js';

const routing = express.Router();

routing.use('/session', sessionRouter);

export default routing;
