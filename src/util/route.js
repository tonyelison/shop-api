const checkAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.sendStatus(403);

const route = (method, callback, isProtected) => (router) =>
  router[method](
    '/',
    isProtected ? checkAuth : (req, res, next) => next(),
    callback,
  );

export default route;
