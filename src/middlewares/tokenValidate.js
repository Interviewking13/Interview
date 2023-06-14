function tokenValidate(req, res, next) {
  req.user = { user_id: '648815f993741781d1067169' };
  next();
}

module.exports = tokenValidate;
