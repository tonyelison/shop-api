import express from 'express';

const router = express.Router();

const route = (() => {
  const checkAuth = (req, res, next) =>
    req.isAuthenticated() ? next() : res.sendStatus(403);

  return (method, resourcePath, callback, isProtected) =>
    router[method](
      `${process.env.API_PATH}${resourcePath}`,
      isProtected ? checkAuth : (req, res, next) => next(),
      callback,
    );
})();

export default route;
