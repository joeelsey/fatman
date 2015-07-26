var User = require('../models/user');
var moment = require('moment');

module.exports = function(app, jwtauth) {
  app.get('/', function(req, res) {
    res.render('index', {title: 'Express'});
  });

  app.get('/home', function(req, res) {
    res.send('home', {msg: 'home page'});
  });

  //get user
  app.get('/user', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err, 'error');
      if (!user) return res.status(500).send('data error');
      
      res.json(user);
    });
  });

  app.put('/user/sex', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send('user not found');

      user.sex = req.body.sex;
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});
        
        res.json(data);
      });
    });
  });

  app.put('/user/height', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});
      user.height.feet = req.body.feet;
      user.height.inches = req.body.inches;

      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/weight', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});

      user.weight = req.body.weight;
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/age', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});
      user.date_of_birth = req.body.date_of_birth;
      var birthdate = moment(req.body.date_of_birth).toDate();
      var age = moment().diff(birthdate,"years");
      user.age = age.toString();
     
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/exercise', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});
      var hours = req.body.hours;
      var minutes = req.body.minutes;
      
      var timeExercised = Number(hours) + Number(parseInt(minutes, 10) / 60);
      timeExercised.toFixed(1);

      var miles = function() {
        var totalTime =  Number(hours) + Number(parseInt(minutes, 10) / 60);
        //Eight is avg speed of a running human.
        var miles = 8 * totalTime;

        return miles.toFixed(2);
      };

      user.exercise.miles = miles();
      user.exercise.time = timeExercised.toString();
     
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/beers', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});
      user.beers.drank = req.body.beers;
     
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/activity', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(500).send({msg: 'user not found'});
      user.activity.activityLevel = req.body.activityLevel;
      user.activity.activityValue = req.body.activityValue;
     
      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });
    });
  });

  app.put('/user/fitness', jwtauth, function(req, res) {
    User.findOne({_id: req.user._id}, function(err, user) {

      user.rating = user.nutritionRating(user, function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) res.send({msg: 'user nutrition rating not found'});
        console.log("NUTRITION===============>>>>>>", user.rating, data);
        return data;
      });

      user.calories.earned = user.caloriesCreatedByBeer(user, function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) res.send({msg: 'need more data for calories earned'});
        console.log('CALORIES EARNED', data);
        return data;
      });
      
      user.calories.burned = user.caloriesBurnedByRunning(user, function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) res.send({msg: 'need more data for calories burned'});
        console.log("calories Burned!1!!!!!", data);
        return data;
      });

      user.beers.earned = user.numberOfBeersEarned(user, function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) res.send({msg: 'need more data for beers earned'});
        console.log('BEERS EARNED', data);
        return data;
      });

      user.save(function(err, data) {
        if (err) return res.status(500).send('err', err);
        if (!data) return res.status(500).send({msg: 'data not saved'});

        res.json(data);
      });

    });
  });
};