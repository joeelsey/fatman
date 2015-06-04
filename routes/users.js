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

router.get('/beer/:facebook_uid', function(req, res) {
  User.find(req.params.facebook_uid, function(err, users) {
    if (err) res.status(500).send('error');
    if (!users) res.status(500).send('user error');
    if (users.length === 0) res.status(401).send("user error");
    var user = users[0];
    var distance = user.milesRan(req.body.hours, req.body.minutes);
    var time = req.body.hours + (req.body.minutes/60);
    var caloriesBurned = user.caloriesBurnedByRunning(distance, time);
    var numberOfBeers = user.numberOfBeers(caloriesBurned);
    var beerData = {
      nutritionRating: user.nutritionRating(),
      milesRan: distance,
      caloriesBurned: numberOfBeers,
      numberOfBeers: caloriesBurned
    };
    res.json(beerData);
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
  User.find(req.body.facebook_uid, function(err, users){
    if (err){
      console.log(err);
      res.status(500).send('error');
    } 
    else if(!users){
      res.status(500).send('data error');
    }
    else{
      console.log("USERS", users[0]);
      var user = users[0];
      console.log("params sent: ",req.body);
      user.facebook_uid = req.body.facebook_uid;
      user.name = req.body.name;
      user.sex = req.body.sex;
      user.weight = req.body.weight;
      var height = {
        feet: req.body["height[feet]"],
        inches: req.body["height[inches]"]
      };
      user.height = height;
      user.date_of_birth = req.body.date_of_birth;
      user.age = user.userAge(req.body.date_of_birth);
      console.log("user age", user.date_of_birth, user.age);
      user.miles = user.milesRan(req.body.hours, req.body.minutes);
      user.activity = {
        activityLevel: req.body.activityLevel,
        activityValue: req.body.activityValue
      };
      user.dataSeted = true;
      user.update(function(err, data){
        if (err) {
          console.log(err);
          res.status(500).send('error');
        }
        else if(!data){
          res.status(500).send('data error');
        }
        else{
          console.log("user1: ",data);
          console.log("user2: ",user);
          res.json(user);
        }
      });
    }
  });
});

router.post('/signin', function(req, res){
  User.find(req.body.facebook_uid, function(err, users){
    if (err) res.status(500).send('error');
    if(!users || users.length === 0){
      console.log("Creating new user!!");
      var user = new User();
      user.facebook_uid = req.body.facebook_uid || 1;
      user.name = req.body.name;
      user.dataSeted = false;
      user.save(function(err, data) {
        if (err) res.status(500).send('error');
        if (!data) res.status(500).send('data error');
        console.log("user: ", user);
        console.log("saved user: ", data);
        res.json(data);
      });
    }
    else{
      users = users[0];
      console.log("Found User: ", users);
      res.json(users);
    }
  });
});

module.exports = router;
