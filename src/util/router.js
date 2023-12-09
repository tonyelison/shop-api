// import express from 'express';

// const route = (() => {
// const router = express.Router();

const checkAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.sendStatus(403);

const route = (method, resourcePath, callback, isProtected) => (router) =>
  router[method](
    `${process.env.API_PATH}${resourcePath}`,
    isProtected ? checkAuth : (req, res, next) => next(),
    callback,
  );
// })();

export default route;
