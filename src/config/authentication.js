const publicEndpoints = [
  '/api/hello',
  '/api/signup',
  '/api/login',
  '/api/login-failure',
];

const checkAuthentication =
  (allowedUrls = []) =>
  (req, res, next) => {
    if (req.isAuthenticated() || allowedUrls.includes(req.path)) {
      next();
      return;
    }
    res.sendStatus(403);
  };

export default {
  verify: () => checkAuthentication(publicEndpoints),
};
