import express from 'express';
import { HttpMethod } from './http.js';

const checkAuth = (isPublicRoute) =>
  isPublicRoute
    ? (req, res, next) => next()
    : (req, res, next) =>
        req.isAuthenticated() ? next() : res.sendStatus(403);

const Router = () => {
  const router = express.Router();

  const addRoute = (method, callback, { path, isPublic } = {}) =>
    router[method](path || '/', checkAuth(isPublic), callback);

  const method = {
    get: (...args) => addRoute(HttpMethod.GET, ...args),
    post: (...args) => addRoute(HttpMethod.POST, ...args),
    put: (...args) => addRoute(HttpMethod.PUT, ...args),
    patch: (...args) => addRoute(HttpMethod.PATCH, ...args),
    del: (...args) => addRoute(HttpMethod.DELETE, ...args),
  };

  return [router, method];
};

export default Router;
