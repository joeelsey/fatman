var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BEER_CALORIES = 200;

var userSchema = mongoose.Schema({
	facebook_uid: String,
  name: String,
  sex: String,
  weight: String,
  height: {
    feet: String,
    inches: String
  },
  date_of_birth: String,
  age: String,
  dataSeted: Boolean,
  activity: String,
  miles: String,
  coupons: []

});

userSchema.methods.nutritionRating = function() {
  var USER_CM = (userSchema.height / 0.032808) + (userSchema.inches * 2.54);
  var USER_WEIGHT = userSchema.weight * 0.45359237;
  var nutritionRating;
  if (userSchema.sex === "Male") {
    var Men_REE = (9.99 * USER_WEIGHT) + (6.25 * USER_CM) - (4.92 * userSchema.age) + 5;
    nutritionRating= Men_REE;
  }

  if (userSchema.sex === "Female") {
    var Women_REE = (9.99 * USER_WEIGHT) + (6.25 * USER_CM) - (4.92 * userSchema.age) - 161;
    nutritionRating = Women_REE;
  }
  nutritionRating *= Number(userSchema.activity);
  return nutritionRating;
};

userSchema.methods.milesRan = function(hours, minutes) {
  var totalTime = hours + (minutes / 60);
  //Eight is avg speed of a running human.
  var miles = 8 * totalTime;
  return miles;
};

userSchema.methods.numberOfBeers = function(caloriesBurned) {
  var decimalBeers = caloriesBurned/BEER_CALORIES;
  var roundedBeers = Math.round( decimalBeers * 10 ) / 10;
  return roundedBeers;
};

userSchema.methods.caloriesBurnedByRunning = function (distance,time) {  
  //distance in miles
  //time in hours
  var calories = 0;
  var met = 0;
  var metArray = [6.0,8.3,9,9.8,10.5,11,11.4,11.8,12.3,12.8,14.5,16,19,19.8,23];
  var knownSpeeds = [4,5,5.2,6,6.7,7,7.5,8,8.6,9,10,11,12,13,14];
  var speed = (distance/time);
  var roundedSpeed = closestSpeed(speed);
  var weight = Number(userSchema.weight);
  met = getMet(roundedSpeed);
  calories = cckg(weight,met,time);
  
  /***Helpers functions***/
  function cckg(w,met,t){ 
    var kg = w*0.45359237;
    return Math.round(met * 3.5 * (kg) / 200 * time);
  }

  function closestSpeed(num) {  
    var curr = knownSpeeds[0];
    var diff = Math.abs (num - curr);
    for (var val = 0; val < knownSpeeds.length; val++) {      
      var newdiff = Math.abs (num - knownSpeeds[val]);
      if (newdiff < diff) {   
        diff = newdiff;
        curr = knownSpeeds[val];
      } 
    }   
    return curr;
  }

  function getMet(s){ 
    var met=-1;
    var metIndex = knownSpeeds.indexOf(s);
    return metArray[metIndex];
  }

  return calories;
};

module.exports = mongoose.model('User', userSchema);