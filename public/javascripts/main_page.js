$(document).ready(function() {
	var currentUser;
	var accessToken = window.sessionStorage.jwt;

	if (accessToken) {
		$.mobile.changePage('#main-page', {
      transition: 'slide',
      changeHash: false
    });
	} else {
		$.mobile.changePage('#login-page', {
      transition: 'slide',
      changeHash: false
    });
	}

	$("#run-content").on("click", function(e){
		e.preventDefault();
		$.ajax({
      method: 'GET',
      url: '/user',
      headers: {'jwt': accessToken},
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        currentUser = data;
      },
      error: function(data) {
        console.log('error', data);
      }
    });

		$.mobile.changePage( "#run", { transition: "slide", changeHash: false });
	});

	$("#drink-content").on("click", function(e) {
		e.preventDefault();
		$.ajax({
      method: 'GET',
      url: '/user',
      headers: {'jwt': accessToken},
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        currentUser = data;
      },
      error: function(data) {
        console.log('error', data);
      }
    });
		
		$.mobile.changePage( "#beers", {transition: "slide", changeHash: false});
	});
	$("#intro-btn").on("click", function(e){
		e.preventDefault();
		var male = $("#checkbox-v-2a").is(':checked');
		var female = $("#checkbox-v-2b").is(':checked');

		if (( male && !female ) || ( !male && female )) { //male xor female
			if (male){
				currentUser.sex = "male";
			} else {
				currentUser.sex = "female";
			}
			$.ajax({
				url: '/user/sex',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});

			$.mobile.changePage( "#height", { transition: "slide", changeHash: false });
		} else {
			alert("You must select one gender.");
		}
	});

	$("#height-btn").on("click", function(e) {
		e.preventDefault();
		var feet = $("#height-feet").val();
		var inches = $("#height-inches").val();
		
		var height = {
			feet: feet.toString(),
    	inches: inches.toString()
		};
		currentUser.feet = height.feet;
		currentUser.inches = height.inches;
		
		$.ajax({
				url: '/user/height',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
		});
		$.mobile.changePage( "#weight", { transition: "slide", changeHash: false });
	});

	$("#weight-btn").on("click", function(e){
		e.preventDefault(); 
		currentUser.weight = $("#weight-lbs").val();
		
		$.ajax({
				url: '/user/weight',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
		});
		$.mobile.changePage( "#birthday", { transition: "slide", changeHash: false });
	});

	$("#birthday-btn").on("click", function(e){
		e.preventDefault();
		var day = $("#birthday-day").val();
		var month = $("#birthday-month").val();
		var year = $("#birthday-year").val();
		var date = day.toString() + " " + month.toString() + " " + year.toString();

		currentUser.date_of_birth = date;
	  
	  $.ajax({
				url: '/user/age',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
		});
		$.mobile.changePage( "#activity", { transition: "slide", changeHash: false });
	});

	$("#activity-btn").on("click", function(e) {
		e.preventDefault();
		var activity = {
			activityValue: $("#select-native-1").val(),
			activityLevel: $("#select-native-1").children(":selected").attr('name')
		};

		currentUser.activityValue = activity.activityValue;
		currentUser.activityLevel = activity.activityLevel;

		$.ajax({
				url: '/user/activity',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
		});
		$.mobile.changePage("#run", { transition: "slide", changeHash: false});
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.hours = $("#run-hours").val();
		currentUser.minutes = $("#run-minutes").val();

		$.ajax({
				url: '/user/exercise',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$.mobile.changePage( "#fitness-donut", { transition: "slide", changeHash: false });
	});

	$("#beer-btn").on("click", function(e) {
		e.preventDefault();
		currentUser.beers = $("#beers-drank").val();
		
		$.ajax({
				url: '/user/beers',
				type: 'PUT',
				data: JSON.stringify(currentUser),
				headers: {'jwt': accessToken},
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$.mobile.changePage("#fitness-donut", { transition: "slide", changeHash: false });
	});
});