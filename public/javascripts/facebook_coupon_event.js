$(document).ready(function() {
  var params = {};
  var venue = 'Hop & Hound';
  $('#coupon-code').on('click', function() {
    params[FB.AppEvents.ParameterNames.VENUE] = venue;
    FB.AppEvents.logEvent(FB.AppEvents.CouponCode.COUPON,
                          null,
                          params);
    console.log("COUPON USED");
  });
});