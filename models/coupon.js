var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var couponSchema = mongoose.Schema({
  imageUrl: String,
  name: String,
  date: String,
  location: String,
  expiration: String,

});

module.exports = mongoose.model('Coupon', couponSchema);