$(document).ready(function() {
  var loginData;

  $('#login-button').on('click', function() {
    loginData = {
      email: $('#username').val(),
      password: $('#password').val()
    };
    console.log('login button clicked', JSON.stringify(loginData));
    $.ajax({
      method: 'GET',
      url: '/users',
      dataType: 'json',
      beforeSend: function(xhr) { xhr.setRequestHeader("Authorization", "Basic " + btoa(loginData.email + ":" + loginData.password)); },
      data: JSON.stringify(loginData),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        $.mobile.changePage('#main-page', {
          transition: 'slide',
          changeHash: false
        });
      },
      error: function(data) {
        console.log('error', data);
      }
    });
  });

  $('#create-account').on('click', function() {
    loginData = {
      email: $('#username').val(),
      password: $('#password').val()
    };
    console.log('post login', loginData);
    $.ajax({
      method: 'POST',
      url: '/users',
      dataType: 'json',
      data: JSON.stringify(loginData),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        $.mobile.changePage('#main-page', {
          transition: 'slide',
          changeHash: false
        });
      },
      error: function(data) {
        console.log('error', data);
      }
    });
  });

});