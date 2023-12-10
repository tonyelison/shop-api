import express from 'express';

const checkAuth = (isPublicRoute) =>
  isPublicRoute
    ? (req, res, next) => next()
    : (req, res, next) =>
        req.isAuthenticated() ? next() : res.sendStatus(403);

class Router extends express.Router {
  add = (method, callback, { path, isPublic } = {}) =>
    this[method](path || '/', checkAuth(isPublic), callback);
}

export default Router;
