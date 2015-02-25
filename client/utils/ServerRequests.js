//Parse used for prototyping only

var Parse = require('./ParseInit');
var Router = require('react-router');
var _ = require('underscore');

var parseEntry = function(entry){
	return _.extend({}, 
		entry.attributes,
		{
			id:entry.id,
			createdAt: entry.createdAt,
			updatedAt: entry.updatedAt
		}	
	)
}

var ServerRequests = {
	createUser: function(username, password, cb){
		console.log("CreateAccount");
		Parse.User.signUp(username, password, {ACL: new Parse.ACL()}, 
		{
			success: function(user){
				if(cb) cb(true);
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

		if(!Parse.User.current()){
			if(cb) cb(null);
			return null;
		}

		console.log(diary_entry);

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var diaryEntry = new DiaryEntry();
		diaryEntry.set("title", diary_entry.title);
		diaryEntry.set("text", diary_entry.text);
		diaryEntry.set("createdBy", Parse.User.current());

		diaryEntry.save(null, 
			{
				success: function(entry){
					console.log("Added entry");
					if(cb) cb(parseEntry(entry));
				},
				error: function(entry, error){
					console.log("Error adding");
					console.log(error);
					if(cb) cb(null);
				}
			}
		);

	},

	removeEntry: function(diary_entry, cb){
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
		queryObject.get(diary_entry.id, {
			success: function(entry){
				entry.destroy({
					success: function(deleted_entry){
						console.log(deleted_entry);
						if(cb) cb(true);
					},
					error: function(deleted_entry, error){
						console.log(error);
						if(cb) cb(false);
					}
				})
			},
			error: function(entry, error){
				console.log(error);
			}
		});
	},

	updateEntry: function(diary_entry, cb){
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
		queryObject.get(diary_entry.id, {
			success: function(diaryEntry){
				console.log("updateEntrySuccess");
				diaryEntry.set("title", diary_entry.title);
				diaryEntry.set("text", diary_entry.text);
				diaryEntry.save();

				console.log(diary_entry);

				if(cb) cb(diary_entry);
			},
			error: function(diaryEntry, error){
				console.log(error);
				if(cb) cb(null);
			}
		});

	},

	getEntries: function(cb){
		console.log("getEntries");
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry).equalTo("createdBy", Parse.User.current());
		queryObject.ascending("createdAt");
		queryObject.find({
			success: function(results){
				console.log(results);

				if(cb){
					entries = [];
					for(var i = 0; i < results.length; i++){
						entries.push(parseEntry(results[i]));
					}
					cb(entries);
				}
			},
			error: function(error){
				console.log(error);
			}
		})
	},

	saveDrawing: function(data, cb){
		var image_data = data.substring(str.indexOf(',')+1);

		console.log(image_data);
	}
};

module.exports = ServerRequests;