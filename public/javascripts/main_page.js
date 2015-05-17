$(document).ready(function(){
	$("#run-content").on("click", function(e){
		e.preventDefault();
		if(!currentUser.data.dataSeted){
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
		currentUser.data.height = height
		$.mobile.changePage( "#weight", { transition: "slide", changeHash: false });
	});

	$("#weight-btn").on("click", function(e){
		e.preventDefault(); 
		currentUser.data.weight = $("#weight-lbs").val();
		$.mobile.changePage( "#birthday", { transition: "slide", changeHash: false });
	});

	$("#birthday-btn").on("click", function(e){
		e.preventDefault();
		var day = $("#birthday-day").val();
		var month = $("#birthday-month").val();
		var year = $("#birthday-year").val();
		currentUser.data.date_of_birth = day + "/" + month + "/" + year;
		currentUser.save(function(data){
			currentUser.data.dataSeted = data.dataSeted
		});
	});

	$("#run-btn").on("click", function(e){
		e.preventDefault();
		currentUser.getBeerData(function(){
			$.mobile.changePage( "#fitness-donut", { transition: "slide", changeHash: false });
		})
	});

})