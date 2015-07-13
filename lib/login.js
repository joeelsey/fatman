var User = require('../models/user.js');
var $ = require('jquery');

module.exports = function() {
    console.log('calling login');
    return function(req, res, next) {
        $.ajaxSetup({
            cache: true
        });
        $.getScript('//connect.facebook.net/en_US/sdk.js', function() {
            FB.init({
                appId: '1645169765701795',
                xfbml: true,
                version: 'v2.3'
            });
        });

        FB.api('/me', function(graphApiResponse) {
                console.log('graphApiResponse', graphApiResponse);
                var user = {
                    facebook_uid: graphApiResponse.id,
                    name: graphApiResponse.name
                };
                console.log("Posting data: ", user); 
        });
    };
};
