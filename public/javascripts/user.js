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
			$.post('/users/info', this.userData, callback);
		},
		getBeerData: function(callback){
			var fbuid = this.userData.facebook_uid;
			var that = this;
			var runningData = {
				hours: this.userData.hours,
				minutes: this.userData.minutes
			}
			$.get("/users/beer/"+fbuid, runningData, function(data){
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
