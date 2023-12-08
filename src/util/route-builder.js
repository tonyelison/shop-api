import express from 'express';

const router = express.Router();

const routeBuilder = (() => {
  const checkAuth = (req, res, next) =>
    req.isAuthenticated() ? next() : res.sendStatus(403);

  const build = (method, resourcePath, callback, isProtected) =>
    router[method](
      `${process.env.API_PATH}${resourcePath}`,
      isProtected ? checkAuth : (req, res, next) => next(),
      callback,
    );

  return {
    checkAuth,
    build,
  };
})();

export default routeBuilder;
