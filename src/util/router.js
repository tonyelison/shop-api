import express from 'express';

const checkAuth = (authRequired) =>
  authRequired
    ? (req, res, next) => (req.isAuthenticated() ? next() : res.sendStatus(403))
    : (req, res, next) => next();

class Router extends express.Router {
  add = (method, callback, { path, isProtected } = {}) =>
    this[method](path || '/', checkAuth(isProtected), callback);
}

export default Router;
