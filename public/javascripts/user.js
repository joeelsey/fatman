function User(currentUserData){
	this.currentUser = {
		facebook_uid: "",
	  name: "",
	  sex: "",
	  weight: "",
	  height: "",
	  date_of_birth: "",
	  age: "" 
	}
	for(userData in currentUserData){
		this.currentUser[userData] = currentUserData[userData]
	}
	return this.currentUser
}