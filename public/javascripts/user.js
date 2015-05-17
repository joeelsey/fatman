function User(currentUserData){
	this.userData = {
		facebook_uid: "",
	  name: "",
	  sex: "",
	  weight: "",
	  height: {
	    feet: "",
	    inches: ""
	  },
	  date_of_birth: "",
	  age: "",
	  save: function(callback){
	  	var requestData = $.extend( true, this, {} );
	  	delete requestData.save;
	  	delete requestData.getBeerData;
			$.post('/users/info', requestData, callback);
		},
		getBeerData: function(callback){
			var fbuid = this.facebook_uid;
			var that = this;
			var runningData = {
				hours: this.hours,
				minutes: this.minutes
			};
			var url = "/users/beer/" + fbuid;
			console.log(url);
			$.get(url, runningData, function(data){
				that.beerData = data;
				callback();
			});
		}
	}
	for(userData in currentUserData){
		this.userData[userData] = currentUserData[userData]
	}
	return this.userData
}
