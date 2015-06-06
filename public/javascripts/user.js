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
	  	var requestData = this.getRequestData();
			$.post('/users/info/' + requestData.facebook_uid, requestData, callback);
		},
		getRequestData: function(){
			var requestData = {
	  		facebook_uid: this.facebook_uid,
			  name: this.name,
			  sex: this.sex,
			  weight: this.weight,
			  height: this.height,
			  date_of_birth: this.date_of_birth,
			  age: this.age,
	  	};
	  	return requestData;
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
