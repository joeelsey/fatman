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
	  activity: {
    	activityLevel: "",
    	activityValue: ""
  	},
	  beers: "",
    miles: "",
	  save: function(callback){
	  	// delete requestData.save;
	  	// delete requestData.getBeerData;
	  	var requestData = $.extend( true, {} , this );
			$.post('/users/info', this, callback);
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
	};
	for(var userData in currentUserData){
		this.userData[userData] = currentUserData[userData];
	}
	return this.userData;
}
