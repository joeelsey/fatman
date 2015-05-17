var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
  activity: String

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

  return nutritionRating;
};

module.exports = mongoose.model('User', userSchema);