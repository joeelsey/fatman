$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId      : '1645169765701795',
      xfbml      : true,
      version    : 'v2.3'
    });     
    //$('#loginbutton,#feedbutton').removeAttr('disabled');
    //FB.getLoginStatus(updateStatusCallback);
  });
});