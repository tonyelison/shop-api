const publicEndpoints = ['/api/hello', '/api/users', '/api/session'];

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
