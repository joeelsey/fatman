var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin' });
});

router.get('/coupons', function(req, res) {
  res.render('coupons', { title: 'Admin' });
});