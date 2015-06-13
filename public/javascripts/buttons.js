$(function(){
      $(".button").on("click", function() {

      var $button = $(this);
      var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
         // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }

        $button.parent().find("input").val(newVal);
      });

      $(".minute-button").on("click", function() {

      var $button = $(this);
      var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
          var newVal = parseFloat(oldValue) + 1;
          if (newVal < 10) {
            newVal = "0" + newVal;
          }
        } else {
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            if (newVal < 10) {
              newVal = "0" + newVal;
            }
          } else {
            newVal = "0" + 0;
          }
        }

        $button.parent().find("input").val(newVal);
      });
    });