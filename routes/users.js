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

//get user by facebook id
router.get('/info/:facebook_uid', function(req, res) {
  User.find(req.params.facebook_uid, function(err, data) {
    if (err) res.status(500).send('error');
    if (!data) res.status(500).send('data error');
    res.json(data);
  });
});

//store user info
router.post('/info/:facebook_uid', function(req, res) {
  var user = new User();
  user.facebook_uid = req.params.facebook_uid;
  user.name = req.body.name;
  user.sex = '';
  user.weight = '';
  user.height.feet = '';
  user.height.inches = '';
  user.date_of_birth = '';
  user.age = '';
  user.exercise.miles = '0';
  user.exercise.time = '0';
  user.activity.activityLevel = '';
  user.activity.activityValue = '0';
  user.calories.burned = '0';
  user.calories.earned = '0';
  user.beers.drank = '0';
  user.beers.earned = '0';
  user.dataSeted = true;
  user.save(function(err, data){
    if (err) {
      console.log(err);
      return res.status(500).send('error');
    }
    else if(!data){
      return res.status(500).send('data error');
    }
    else{
      console.log("user1: ",data);
      console.log("user2: ",user);
      res.json(user);
    }
  });
});

//update user info.
router.put('/info/:facebook_uid', function(req, res) {
  User.findOne(req.params.facebook_uid, function(err, user) {
    if (err) return res.status(500).send('err', err);
    if (!user) return res.status(500).send({msg: "user not found"});
      user.sex = req.body.sex;
      user.weight = req.body.weight;
      user.height.feet = req.body.feet;
      user.height.inches = req.body.inches;
      user.date_of_birth = req.body.date_of_birth;
      user.age = req.body.age;
      user.exercise.miles = req.body.miles;
      user.exercise.time = req.body.time;
      user.beers.drank = req.body.beers;
      user.activity.activityLevel = req.body.activityLevel;
      user.activity.activityValue = req.body.activityValue;
      user.calories.earned = user.caloriesCreatedByBeer(user, function(err, data) {
        if (err) {
          throw err;
        }
        console.log('CALORIES EARNED', data);
        return data;
      });
      user.beers.earned = user.numberOfBeersEarned(user, function(err, data) {
        if (err) {
          throw err;
        }
        console.log('BEERS EARNED', data);
        return data;
      });
      user.calories.burned = user.caloriesBurnedByRunning(user, function(err, data) {
        if (err) {
          throw err;
        }
        console.log("calories Burned!1!!!!!", data);
        return data;
      });
      user.rating = user.nutritionRating(user, function(err, data) {
        if (err) {
          throw err;
        } 
        console.log("NUTRITION===============>>>>>>", user.rating, data);
        return data;
        
      });
      user.dataSeted = true;
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});
        console.log('data saved', data);
      });
      res.send({msg: 'user updated'});
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
        if (err) return res.status(500).send('error');
        if (!data) return res.status(500).send('data error');
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
