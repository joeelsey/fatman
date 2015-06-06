var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var BEER_CALORIES = 200;

var beersSchema = mongoose.Schema({
  facebook_uid: String,
  name: String,
  date: String,
  beers: String,
  calories: String
});

beersSchema.methods.numberOfBeers = function(caloriesBurned) {
  var decimalBeers = caloriesBurned/BEER_CALORIES;
  var roundedBeers = Math.round( decimalBeers * 10 ) / 10;
  beersSchema.beers = roundedBeers.toString();
  this.update(function(err, data){
    if(err) console.debug(err);
    if(!data) console.debug("Data Error");
    console.log(data);
  });
  return roundedBeers;
};

module.exports = mongoose.model('User', beersSchema);