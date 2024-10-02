const unless = function({paths}, middleware) {
  return function(req, res, next) {
    if (paths.find(path => path === req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};


module.exports = unless;
