var express = require('express');
var request = require('superagent');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
    extended: true
  }));
  app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'));
app.get('/public', function(req, res) {
  res.redirect('fatman.html');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: ' + app.get('port'));
});

console.log('you made it this far.');