require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var facebookLogin = require('./lib/login');

// console.log('facebookLogin', facebookLogin);

var app = express();
var mongoose = require('mongoose');
var aws = require('aws-sdk');
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

console.log("=========AWS CREDENTIALS=========");
console.log("AWS_ACCESS_KEY: ", AWS_ACCESS_KEY);
console.log("AWS_SECRET_KEY: ", AWS_SECRET_KEY);
console.log("S3_BUCKET: ", S3_BUCKET);

// heroku connect
var url = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/fatman_dev';
mongoose.connect(url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/home', routes);
app.use('/users', users);
app.use('/admin', admin);

console.log('app js is getting called');

app.get('/sign_s3', function(req, res, next){
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    console.log("s3_params: ", s3_params);
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
            next(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.json(return_data);
        }
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});


module.exports = app;
