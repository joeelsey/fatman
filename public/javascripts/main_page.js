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
			console.log("currentUser: ", currentUser);
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
		console.log("currentUser: ", currentUser);
		$("#user-height").append("<span>Height: " + currentUser.height.feet + " " + currentUser.height.inches + " " + "</span>");
		$.mobile.changePage( "#weight", { transition: "slide", changeHash: false });
	});

	$("#weight-btn").on("click", function(e){
		e.preventDefault(); 
		currentUser.weight = $("#weight-lbs").val();
		console.log("weight: ", currentUser.weight);
		console.log("currentUser: ", currentUser);
		$("#user-weight").append("<span>Weight: " + currentUser.weight + "</span>");
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
	  console.log('age', currentUser.age);

		console.log("currentUser: ", currentUser);
		console.log("saving to backend...");
		currentUser.save(function(err, data){
			if (err) {
				console.log('did not save data', err);
			} else {
				currentUser.dataSeted = data.dataSeted;
				currentUser.age = data.age;
				console.log("saved currentUser: ", currentUser);
			}
		});
		$("#user-age").append("<span>Age: " + currentUser.age + "</span>");
		$.mobile.changePage( "#run", { transition: "slide", changeHash: false });
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.hours = $("#run-hours").val();
		currentUser.minutes = $("#run-minutes").val();
		console.log("currentUser: ", currentUser);
		currentUser.getBeerData(function(){
			console.log("currentUser with beer: ", currentUser);
		});
		$.mobile.changePage( "#activity", { transition: "slide", changeHash: false });
	});

	$("#beer-btn").on("click", function(e) {
		e.preventDefault();
		currentUser.beers = $("#beers-drank").val();
		console.log("currentUser: ", currentUser);

		$.mobile.changePage("#activity", { transition: "slide", changeHash: false });
	});

	$("#activity-btn").on("click", function(e) {
		e.preventDefault();
		var activity = {
			activityValue: $("#select-native-1").val(),
			activityLevel: $("#select-native-1").children(":selected").attr('name')
		};
		currentUser.activity = activity;
		console.log("currentUser activity level", currentUser.activity.activityValue, currentUser.activity.activityLevel);
		$.mobile.changePage("#fitness-donut", { transition: "slide", changeHash: false});
	});

	if($("#fitness-donut").length > 0){
    $(document).ready(function(){
    	console.log("FITTTTNNEESSSSS DONUUUUTTTTT!!!!!!");
    });
	}
});