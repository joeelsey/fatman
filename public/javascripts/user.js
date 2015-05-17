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
	  age: "" 
	}
	for(userData in currentUserData){
		this.userData[userData] = currentUserData[userData]
	}
	return this.userData
}

User.prototype.save = function(callback){
	$.post('/info', this.userData, callback);
}

User.prototype.data = function(){
	return this.userData;
}

User.prototype.getBeerData = function(callback){
	var fbuid = this.userData.facebook_uid;
	$.get("/beer/"+fbuid, function(data){
		this.beerData = data;
		callback();
	});
}