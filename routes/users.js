var express = require('express');
var router = express.Router();
var User = require('../models/user');
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//get all users
router.get('/info', function(req, res) {
  User.find(function(err, data) {
    if (err) res.status(500).send('error');
    if (!data) res.status(500).send('user error');

    res.json(data);
  });
});

//get user by id
router.get('/info/:id', function(req, res) {
  User.findById(req.params.id, function(err, data) {
    if (err) res.status(500).send('error');
    if (!data) res.status(500).send('data error');

    res.json(data);
  });
});

//store user info
router.post('/info', function(req, res) {
  var user = new User();
  user.name = req.body.name;
  user.sex = req.body.sex;
  user.weight = req.body.weight;
  user.height = req.body.height;
  user.date_of_birth = req.body.date_of_birth;
  user.age = moment().diff(user.date_of_birth, 'years');

  user.save(function(err, data) {
    if (err) res.status(500).send('error');
    if (!data) res.status(500).send('data error');

    res.json(data);
  });
});

module.exports = router;
