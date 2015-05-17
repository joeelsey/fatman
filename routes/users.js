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
router.get('/info/:facebook_uid', function(req, res) {
  User.find(req.params.facebook_uid, function(err, data) {
    if (err) res.status(500).send('error');
    if (!data) res.status(500).send('data error');
    res.json(data);
  });
});

//store user info
router.post('/info', function(req, res) {
  User.find(req.body.facebook_uid, function(err, user){
    if (err) res.status(500).send('error');
    if (!user) res.status(500).send('data error');
    user.facebook_uid = req.body.facebook_uid;
    user.name = req.body.name;
    user.sex = req.body.sex;
    user.weight = req.body.weight;
    user.height = req.body.height;
    user.date_of_birth = req.body.date_of_birth;
    user.age = moment().diff(user.date_of_birth, 'years');
    user.save(function(err, data){
      if (err) res.status(500).send('error');
      if (!data) res.status(500).send('data error');
      res.json(data);
    });
  });
});

router.post('/signin', function(req, res){
  User.find(req.body.facebook_uid , "facebook_uid name", function(err, users){
    if (err) res.status(500).send('error');
    if(!users || users.length == 0){
      var user = new User();
      user.facebook_uid = req.body.facebook_uid;
      user.name = req.body.name;
      user.save(function(err, data) {
        if (err) res.status(500).send('error');
        if (!data) res.status(500).send('data error');
        console.log("user: ", user);
        console.log("saved user: ", data);
        res.json(data);
      });
    }
    else{
      var user = users[0]
      console.log("Found User: ", user);
      res.json(user);
    }
  });
});


module.exports = router;
