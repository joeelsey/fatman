$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId      : '1645169765701795',
      xfbml      : true,
      version    : 'v2.3'
    });     
    $('#fb-loging-btn').removeAttr('disabled');
  });
  $('#fb-loging-btn').on("click", function(e){
    e.preventDefault();
    FB.getLoginStatus(function(response){
      if (response.status === 'connected') {
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
      }
    });
  })
});