var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var BEER_CALORIES = 200;

var userSchema = mongoose.Schema({
  facebook_uid: String,
  name: String,
  date: String,
  location: String,
  expiration: String
});

module.exports = mongoose.model('User', userSchema);