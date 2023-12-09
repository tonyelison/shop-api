// import ExpressRouter from './express-router.js';

// function addRoute(method, callback, options = {}) {
//   return this[method](
//     '/',
//     options.isProtected ? checkAuth : (req, res, next) => next(),
//     callback,
//   );
// }

// class Router extends ExpressRouter {
//   constructor(...args) {
//     super(...args);
//     this.add = addRoute;
//   }
// }

import express from 'express';

function Router() {
  return express.Router.call(this);
}

const checkAuth = (req, res, next) =>
  req.isAuthenticated() ? next() : res.sendStatus(403);

Router.__proto__.add = function add(method, callback, options = {}) {
  return this[method](
    '/',
    options.isProtected ? checkAuth : (req, res, next) => next(),
    callback,
  );
};

export default Router;
