var express = require('express');
var router = express.Router();
var app = express();
var Coupon = require('../models/coupon');


router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin' });
});

router.get('/coupons', function(req, res) {
  Coupon.find({}, function(err, coupons){
    if (err) res.status(500).send('error');
    if (!coupons) res.status(500).send('coupon error');
    console.log("coupons: ", coupons);
    res.render('coupons/index', { title: 'Admin', coupons: coupons });
  });
  
});

router.get('/coupons/new', function(req, res){
	res.render('coupons/new', { title: 'Admin' });
})

router.post('/coupons', function(req, res){
	var coupon = new Coupon();
  console.log("req.body: ", req.body);
	coupon.name = req.body.name
	coupon.location = req.body.location
	coupon.expiration = req.body.expiration
	coupon.imageUrl = req.body.image_url

	coupon.save(function(err, data) {
    if (err) return res.status(500).send('error');
    if (!data) return res.status(500).send('data error');
    console.log("coupon: ", coupon);
    console.log("saved coupon: ", data);
    res.redirect("/admin/coupons");
  });
});

module.exports = router;