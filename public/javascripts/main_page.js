$(document).ready(function() {
	//button on click events update the user information on the front end and back.

	$("#run-content").on("click", function(e){
		e.preventDefault();
		if(!currentUser.dataSeted){
			$.mobile.changePage( "#intro", { transition: "slide", changeHash: false });
		}
		else{
			$.mobile.changePage( "#run", { transition: "slide", changeHash: false });
		}
	});
	$("#drink-content").on("click", function(e) {
		e.preventDefault();
		if(!currentUser.dataSeted) {
			$.mobile.changePage("#intro", { transition: "slide", changeHash: false});
		} else {
			$.mobile.changePage( "#beers", {transition: "slide", changeHash: false});
		}
	});
	$("#intro-btn").on("click", function(e){
		e.preventDefault();
		var male = $("#checkbox-v-2a").is(':checked');
		var female = $("#checkbox-v-2b").is(':checked');
		if(( male && !female ) || ( !male && female )){ //male xor female
			if(male){
				currentUser.sex = "Male";
			}
			else{
				currentUser.sex = "Female";
			}
			$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
			$.mobile.changePage( "#height", { transition: "slide", changeHash: false });
		}
		else{
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
		currentUser.height = height;
		console.log("currentUser: ", currentUser.height);
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
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
		console.log("weight: ", currentUser.weight);
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
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
		console.log("Date: ", date);
		currentUser.date_of_birth = date;

	  var birthdate = new Date(date);
	  var age = moment().diff(birthdate,"years");
	  currentUser.age = age.toString();
	  console.log('currentUser age', currentUser.age);
	  $.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$.mobile.changePage( "#activity", { transition: "slide", changeHash: false });
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.hours = $("#run-hours").val();
		currentUser.minutes = $("#run-minutes").val();
		var miles = function() {
			var totalTime = currentUser.hours + (currentUser.minutes / 60);
  		//Eight is avg speed of a running human.
  		var miles = 8 * totalTime;
  		return miles.toFixed(2);
		};
		currentUser.miles = miles();
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
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
		console.log("currentUser: ", currentUser);
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$.mobile.changePage("#fitness-donut", { transition: "slide", changeHash: false });
	});

	$("#activity-btn").on("click", function(e) {
		e.preventDefault();
		var activity = {
			activityValue: $("#select-native-1").val(),
			activityLevel: $("#select-native-1").children(":selected").attr('name')
		};
		currentUser.activity = activity;
		console.log("currentUser activity level", currentUser.activity.activityValue, currentUser.activity.activityLevel);
		console.log("currentUser: ", currentUser);
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$.mobile.changePage("#run", { transition: "slide", changeHash: false});
	});
});