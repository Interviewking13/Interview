function tokenValidate(req, res, next) {
  req.user = { _id: '64803fdcf9a6c1c08cc65eb5' };
  next();
}

module.exports = tokenValidate;
