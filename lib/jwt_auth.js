var User = require('../models/user.js');
var jwt = require('jwt-simple');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.jwt || req.body.jwt;

    var decoded;

    try {
      decoded = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
      return res.status(403).send('access denied catch');
    }

    if (decoded.exp <= Date.now()) {
      return res.status(500).send('token has expired');
    }

    User.findOne({_id: decoded.iss}, function(err, user) {
      if (err) return res.status(403).send('access denied error');
      if (!user) return res.status(403).send('access denied user');

      req.user = user;
      next();
    });
  };
};
