var User = require('../models/user');

module.exports = function(app, passport) {
  app.get('/users', 
    passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({jwt: req.user.generateToken(app.get('jwtSecret'))});
  });

  app.post('/users', function(req, res) {
    User.findOne({'basic.email': req.body.email }, function(err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.status(500).send('cannot create that user');

      var regSpecial = /[a-z A-Z 0-9]{8,32}$/;
      if (!regSpecial.test(req.body.password)) {
        return res.status(500).send('bad password');
      }

      if(!req.body.email) return res.status(500).send({msg: 'must pick a user/email'});

      var newUser = new User();
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.dataSeted = true;
      newUser.save(function(err) {
        if (err) return res.status(500).send('server error');
        res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });

};
