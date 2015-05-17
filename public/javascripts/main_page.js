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

	$("#height-btn").on("click", function(e) {
		e.preventDefault();
		var height = {
			feet: $("#height-feet").val(),
    	inches: $("#height-inches").val()
		}
		currentUser.height = height
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
		currentUser.date_of_birth = day + "/" + month + "/" + year;
		console.log("currentUser: ", currentUser);
		console.log("saving to backend...");
		currentUser.save(function(data){
			currentUser.dataSeted = data.dataSeted
			console.log("saved currentUser: ", currentUser);
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