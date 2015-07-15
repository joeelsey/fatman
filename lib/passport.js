var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user.js');

module.exports = function(passport) {
  passport.use('basic', new BasicStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({'basic.email': email }, function(err, user) {
        if (err) return done('server error');

        if (!user) return done('access error user');

        if (!user.validPassword(password)) return done('access error invalid password');

        return done(null, user);
      });
    }));
};
