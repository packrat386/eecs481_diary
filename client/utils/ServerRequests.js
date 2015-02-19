//Parse used for prototyping only

var Parse = require('./ParseInit');
var Router = require('react-router');

var ServerRequests = {
	createUser: function(username, password, cb){
		console.log("CreateAccount");
		Parse.User.signUp(username, password, {ACL: new Parse.ACL()}, 
		{
			success: function(user){
				if(cb) cb(true);
				console.log(user.id);
				if(Parse.User.current())
					console.log("LoggedIn");
				else 
					console.log("Not logged in");
			},
			error: function(user, error){
				if(cb) cb(false);
				console.log(error);
			}
		});
	},

	login: function(username, password, cb){
		// if(localStorage.token){
		if(!(Parse.User.current() === null)){
			console.log("Already logged in");
			return false;
		}

		console.log("LoginAccount");
		Parse.User.logIn(username, password, {
			success: function(user){
				cb(true);
			}, 
			error: function(user, error){
				console.log(error);
				cb(false);
			}
		});
	},

	logout: function(){
		console.log("Logged out");
		Parse.User.logOut();
	},

	loggedIn: function(){
		console.log("Check logged in");
		var curUser = Parse.User.current();
		console.log(!(Parse.User.current() === null));
		console.log(curUser);
		return !(Parse.User.current() === null);
	},

	currentUser: function(){
		return Parse.User.current();
	},

	addEntry: function(diary_entry, cb){
		//Diary Entry Structure
		// {title, text}

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		DiaryEntry.set("title", diary_entry.title);
		DiaryEntry.set("text", diary_entry.text);
		
		var DiaryEntries = Parse.User.current().get("DiaryEntries");
		DiaryEntries.push(DiaryEntry);

		Parse.User.current().save(
			{"DiaryEntries": DiaryEntries}, 
			{
				success: function(DiaryEntry){
					if(cb) cb(DiaryEntry);
				},
				error: function(DiaryEntry, error){
					console.log(error);
				}
			}
		);



		// recieved: {id, ...} 


	}
};

module.exports = ServerRequests;