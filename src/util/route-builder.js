import express from 'express';

const router = express.Router();
const noop = () => {};

const routeBuilder = (() => {
  const checkAuth = (req, res, next) =>
    req.isAuthenticated() ? next() : res.sendStatus(403);

  const build = (method, resourcePath, callback, isProtected) =>
    router[method](
      `${process.env.API_PATH}${resourcePath}`,
      isProtected ? checkAuth : noop,
      callback,
    );

  return {
    checkAuth,
    build,
  };
})();

export default routeBuilder;
