var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var BEER_CALORIES = 156;
var RUNNING_CALORIES = 105;
var expires = moment().add(7, 'days').valueOf();

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
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
  activity: {
    activityLevel: String,
    activityValue: String
  },
  beers: {
    drank: String,
    earned: String
  },
  exercise: {
    miles: String,
    time: String
  },
  calories: {
    burned: String,
    earned: String
  },
  rating: String,
  coupons: []
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret) {
  var _this = this;
  var token = jwt.encode({
    iss: _this._id,
    exp: expires
  }, secret);
  return token;
};

userSchema.methods.userAge = function(birthday) {
  var date = new Date(birthday);
  var age = moment().diff(date,"years");
  return age.toString();
};

userSchema.methods.nutritionRating = function(user) {
  console.log('NUTRITION RATING METHOD======', user.height.feet, user.height.inches, user.weight, user.sex, user.age, user.activity.activityValue);
  var USER_CM = (Number(user.height.feet) / 0.032808) + (Number(user.height.inches) * 2.54);
  var USER_WEIGHT = Number(user.weight) * 0.45359237;
  var nutritionRating;
  if (user.sex === "male") {
    var Men_REE = (9.99 * USER_WEIGHT) + (6.25 * USER_CM) - (4.92 * Number(user.age)) + 5;
    nutritionRating = Men_REE;
  }

  if (user.sex === "female") {
    var Women_REE = (9.99 * USER_WEIGHT) + (6.25 * USER_CM) - (4.92 * user.age) - 161;
    nutritionRating = Women_REE;
  }
  nutritionRating *= Number(user.activity.activityValue);
  nutritionRating = nutritionRating.toFixed(2);
  console.log('NUTRITION RATING', nutritionRating);
  return nutritionRating.toString();
};

userSchema.methods.caloriesCreatedByBeer = function(user) {
  var calories = Number(user.beers.drank) * BEER_CALORIES;
  return calories.toString();
};

userSchema.methods.numberOfMilesEarned = function(user) {
  var miles = Number(user.calories.earned ) / RUNNING_CALORIES;
  return miles.toString();
};

userSchema.methods.numberOfBeersEarned = function(user) {
  console.log('NUMBER OF BEERS EARNED', user.calories.earned, user.calories.burned);
  var beers = Math.round(Number(user.calories.earned) / Number(user.calories.burned));
  if(beers < 0){
    beers = 0;
  }
  return beers.toString();
};

userSchema.methods.caloriesBurnedByRunning = function (user) {  
  //distance in miles
  //time in hours
  console.log('USER CALORIES BURNED', user.exercise.time, user.exercise.miles, user.weight);
  var calories = 0;
  var met = 0;
  var metArray = [6.0,8.3,9,9.8,10.5,11,11.4,11.8,12.3,12.8,14.5,16,19,19.8,23];
  var knownSpeeds = [4,5,5.2,6,6.7,7,7.5,8,8.6,9,10,11,12,13,14];
  var speed = (Number(user.exercise.miles)/Number(user.exercise.time));
  var roundedSpeed = closestSpeed(speed);
  var weight = Number(user.weight * 0.45359237);
  met = getMet(roundedSpeed);
  calories = cckg(weight,met, Number(user.exercise.time));
  
  /***Helpers functions***/
  function cckg(w,met,t){ 
    var kg = w*0.45359237;
    return Math.round(met * 3.5 * (kg) / 200 * Number(user.exercise.time));
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
  console.log('USER CALORIES BURNED AT THE END', calories);
  return calories;
};

module.exports = mongoose.model('User', userSchema);