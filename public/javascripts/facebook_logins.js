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
    function fatmanSignIn(facebookUid){
      FB.api('/me', function(graphApiResponse) {
        var user = {
          facebook_uid: facebookUid,
          name: graphApiResponse.name
        };
        console.log("Posting data: ",user);
        $.post("/users/signin", user,function(data){
          console.log("return data: ", data);
          window.currentUser = new User(data);
          var name = currentUser.name.split(" ")[0]
          var numberBeers = currentUser.beers || 0
          $("#main-page #user-name").text(name + " EARNED: ");
          $("#main-page #user-beer").text(numberBeers);
          $.mobile.changePage( "#main-page", { transition: "slide", changeHash: false });
        })
      });
    }
    FB.getLoginStatus( function(statusResponse){
      if (statusResponse.status === 'connected') {
        var facebookUid = statusResponse.authResponse.userID;
        fatmanSignIn(facebookUid);
      } 
      else {
        FB.login(function(loginResponse){
          if (loginResponse.authResponse) {
            var facebookUid = loginResponse.authResponse.userID;
            fatmanSignIn(facebookUid);
           } else {
             console.log('User cancelled login or did not fully authorize.');
           }
        });
      }
    });
  });
});
