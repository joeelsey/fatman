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
				currentUser.sex = "Male"
			}
			else{
				currentUser.sex = "Female"
			}
			console.log("currentUser: ", currentUser);
			$.mobile.changePage( "#height", { transition: "slide", changeHash: false });
		}
		else{
			alert("You must select one gender.")
		}
	})

	$("#height-btn").on("click", function(e) {
		e.preventDefault();
		var height = {
			feet: $("#height-feet").val(),
    	inches: $("#height-inches").val()
		}
		console.log("height: ", height);
		currentUser.height = height;
		console.log("currentUser: ", currentUser);
		$.mobile.changePage( "#weight", { transition: "slide", changeHash: false });
	});

	$("#weight-btn").on("click", function(e){
		e.preventDefault(); 
		currentUser.weight = $("#weight-lbs").val();
		console.log("currentUser: ", currentUser);
		$.mobile.changePage( "#birthday", { transition: "slide", changeHash: false });
	});

	$("#birthday-btn").on("click", function(e){
		e.preventDefault();
		var day = $("#birthday-day").val();
		var month = $("#birthday-month").val();
		var year = $("#birthday-year").val();
		var date = year.toString() + " " + month.toString() + " " + day.toString();
		console.log("Date: ", date);
		currentUser.date_of_birth = date
		console.log("currentUser: ", currentUser);
		console.log("saving to backend...");
		currentUser.save(function(data){
			currentUser.dataSeted = data.dataSeted
			console.log("saved currentUser: ", currentUser);
			$.mobile.changePage( "#run", { transition: "slide", changeHash: false });
		});
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.hours = $("#run-hours").val();
		currentUser.minutes = $("#run-minutes").val();
		console.log("currentUser: ", currentUser);
		currentUser.getBeerData(function(){
			console.log("currentUser with beer: ", currentUser);
			$.mobile.changePage( "#fitness-donut", { transition: "slide", changeHash: false });
		})
	});

})