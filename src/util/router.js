import express from 'express';

class Router extends express.Router {}

Object.getPrototypeOf(Router).add = function add(
  method,
  callback,
  options = {},
) {
  const path = options.path || '/';
  const authorize = options.isProtected
    ? (req, res, next) => (req.isAuthenticated() ? next() : res.sendStatus(403))
    : (req, res, next) => next();

  return this[method](path, authorize, callback);
};

export default Router;

export const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};
