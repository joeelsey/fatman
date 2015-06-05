$(document).ready(function(){
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
			// console.log("currentUser: ", currentUser.facebook_uid);
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
		var height = {
			feet: $("#height-feet").val(),
    	inches: $("#height-inches").val()
		};
		console.log("height: ", height);
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
		$("#user-height").append("<span>" + currentUser.height.feet + " " + currentUser.height.inches + " " + "</span>");
		$.mobile.changePage( "#weight", { transition: "slide", changeHash: false });
	});

	$("#weight-btn").on("click", function(e){
		e.preventDefault(); 
		currentUser.weight = $("#weight-lbs").val();
		console.log("weight: ", currentUser.weight);
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
		$("#user-weight").append("<span>" + currentUser.weight + "</span>");
		$.mobile.changePage( "#birthday", { transition: "slide", changeHash: false });
	});

	$("#birthday-btn").on("click", function(e){
		e.preventDefault();
		var day = $("#birthday-day").val();
		var month = $("#birthday-month").val();
		var year = $("#birthday-year").val();
		var date = year.toString() + " " + month.toString() + " " + day.toString();
		console.log("Date: ", date);
		currentUser.date_of_birth = date;

	  var birthdate = new Date(date);
	  var age = moment().diff(birthdate,"years");
	  currentUser.age = age.toString();
	  $.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		$("#user-age").append("<span>" + currentUser.age + "</span>");
		$.mobile.changePage( "#activity", { transition: "slide", changeHash: false });
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.hours = $("#run-hours").val();
		currentUser.minutes = $("#run-minutes").val();
		console.log("currentUser: ", currentUser);
		// currentUser.getBeerData(function(){
		// 	console.log("currentUser with beer: ", currentUser);
		// });
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
		$(".miles-text").text("Miles: " + currentUser.miles);
		$(".beer-text").text("Beers: " + currentUser.beers);
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
		$(".miles-text").text("Miles: " + currentUser.miles);
		$(".beer-text").text("Beers: " + currentUser.beers);
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
		console.log("saving to backend...");
		$.ajax({
				url: '/users/info/' + currentUser.facebook_uid,
				type: 'PUT',
				data: JSON.stringify(currentUser),
				contentType: 'application/json',
				success: function(data) {
					console.log(data);
				}
			});
		// currentUser.save(function(err, data){
		// 	if (err) {
		// 		console.log('did not save data', err);
		// 	} else {
		// 		currentUser.dataSeted = data.dataSeted;
		// 		currentUser.age = data.age;
		// 		console.log("saved currentUser: ", currentUser);
		// 	}
		// });
		$("#user-activity").append("<span>" + currentUser.activity.activityLevel + "</span>");
		$.mobile.changePage("#run", { transition: "slide", changeHash: false});
	});
});