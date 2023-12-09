import express from 'express';

function Router() {
  return express.Router.call(this);
}

Object.getPrototypeOf(Router).add = function add(
  method,
  callback,
  options = {},
) {
  const authorize = options.isProtected
    ? (req, res, next) => (req.isAuthenticated() ? next() : res.sendStatus(403))
    : (req, res, next) => next();

  return this[method]('/', authorize, callback);
};

export default Router;
