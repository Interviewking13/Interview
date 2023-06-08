function tokenValidate(req, res, next) {
    req.user = { _id: '6478073927182b326a1ced5c' };
    next();
  }
  
  module.exports = tokenValidate;
  