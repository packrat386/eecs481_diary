//Parse used for prototyping only

var Parse = require('./ParseInit');
var Router = require('react-router');
var _ = require('underscore');
var moment = require('moment');

var parseEntry = function (entry) {
	return _.extend({},
		entry.attributes,
		{
			id: entry.id,
			createdAt: moment(entry.createdAt, "ddd MMM DD YYYY hh:mm:ss"),
			updatedAt: moment(entry.updatedAt, "ddd MMM DD YYYY hh:mm:ss")
		}
	)
};

var ServerRequests = {
	createUser: function (user_obj, cb) {
		console.log("CreateAccount");
		var CaseEntry = Parse.Object.extend("Case");
		var caseEntry = new CaseEntry();
		Parse.User.signUp(user_obj.username, user_obj.password, {user_type: user_obj.user_type},
			{
				success: function (user) {

					if (Parse.User.current())
						console.log("LoggedIn");
					else
						console.log("Not logged in");


					// if(user.attributes.user_type == "patient"){
					// 	//Create a new case entry
					// 	caseEntry.save(null, 
					// 			{
					// 				success: function (new_caseEntry) {
					// 					console.log("Added entry");

					// 						//Create and save relation
					// 						var relation = caseEntry.relation("Patient");
					// 						relation.add(user);

					// 						new_caseEntry.save(null, 
					// 							{ 
					// 								success: function(response){
					// 									console.log("Saved new case");
					// 									if (cb) return cb(user);
					// 								},
					// 								error: function(response, error){
					// 									if (cb) return cb(user);
					// 								}
					// 							}

					// 						);										
					// 				},
					// 				error: function (entry, response) {
					// 					console.log("Error adding");
					// 					console.log(error);
					// 					if (cb) return cb(response);
					// 				}
					// 			});
					// } else {
					if(cb) return cb(user);
					// }

				},
				error: function (user, error) {
					if (cb) cb(error);
					console.log(error);
				}
			});
	},

	login: function (username, password, cb) {
		// if(localStorage.token){
		if (!(Parse.User.current() === null)) {
			console.log("Already logged in");
			return false;
		}

		console.log("LoginAccount");
		Parse.User.logIn(username, password, {
			success: function (user) {
				cb(user);
			},
			error: function (user, error) {
				console.log(error);
				cb(error);
			}
		});
	},

	logout: function () {
		Parse.User.logOut();
	},

	loggedIn: function () {
		return !(Parse.User.current() === null);
	},

	currentUser: function () {
		return Parse.User.current();
	},

	addEntry: function (diary_entry, cb) {
		//Diary Entry Structure
		// {title, text}

		if (!Parse.User.current()) {
			if (cb) cb(null);
			return null;
		}

		console.log(diary_entry);

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var diaryEntry = new DiaryEntry();
		diaryEntry.set("title", diary_entry.title);
		diaryEntry.set("text", diary_entry.text);
		diaryEntry.set("createdBy", Parse.User.current());
		if (diary_entry.canvasImage)
		// diaryEntry.set("canvasImage", new Parse.File("canvas.png", {base64:diary_entry.canvasImage}));
			diaryEntry.set("canvasImage", diary_entry.canvasImage);

		diaryEntry.save(null,
			{
				success: function (entry) {
					console.log("Added entry");
					if (cb) cb(parseEntry(entry));
				},
				error: function (entry, error) {
					console.log("Error adding");
					console.log(error);
					if (cb) cb(null);
				}
			}
		);

	},
	addDoodle: function (diary_entry, cb) {
		if (!Parse.User.current()) {
			if (cb) cb(null);
			return null;
		}
		console.log(diary_entry);

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var diaryEntry = new DiaryEntry();
		diaryEntry.set("title", diary_entry.title);
		diaryEntry.set("createdBy", Parse.User.current());
		diaryEntry.set("type", "doodle");
		diaryEntry.set("canvasImage", diary_entry.canvasImage);
		diaryEntry.save(null,
			{
				success: function (entry) {
					console.log("Added doodle entry");
					if (cb) cb(parseEntry(entry));
				},
				error: function (entry, error) {
					console.log("Error adding doodle entry");
					console.log(error);
					if (cb) cb(null);
				}
			}
		);
	},

	addVisit: function(diary_entry, cb) {
		if (!Parse.User.current()) {
			if (cb) cb(null);
			return null;
		}
		console.log(diary_entry);

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var diaryEntry = new DiaryEntry();
		diaryEntry.set("title", diary_entry.title);
		diaryEntry.set("createdBy", Parse.User.current());
		diaryEntry.set("type", "visit");
		diaryEntry.set("data", diary_entry.visitor);
		diaryEntry.save(null,
			{
				success: function (entry) {
					console.log("Added visit entry");
					if (cb) cb(parseEntry(entry));
				},
				error: function (entry, error) {
					console.log("Error adding visit entry");
					console.log(error);
					if (cb) cb(null);
				}
			}
		);
	},

	removeEntry: function (diary_entry, cb) {
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
		queryObject.get(diary_entry.id, {
			success: function (entry) {
				entry.destroy({
					success: function (deleted_entry) {
						console.log(deleted_entry);
						if (cb) cb(true);
					},
					error: function (deleted_entry, error) {
						console.log(error);
						if (cb) cb(false);
					}
				})
			},
			error: function (entry, error) {
				console.log(error);
			}
		});
	},

	updateEntry: function (diary_entry, cb) {
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
		queryObject.get(diary_entry.id, {
			success: function (diaryEntry) {
				console.log("updateEntrySuccess");
				diaryEntry.set("title", diary_entry.title);
				diaryEntry.set("text", diary_entry.text);
				if (diary_entry.canvasImage) {
					// diaryEntry.set("canvasImage", new Parse.File("canvas.png", {base64:diary_entry.canvasImage}));
					diaryEntry.set("canvasImage", diary_entry.canvasImage);
				}

				diaryEntry.save();

				console.log("Server requests updateEntry");
				console.log(parseEntry(diaryEntry));

				if (cb) cb(parseEntry(diaryEntry));
			},
			error: function (diaryEntry, error) {
				console.log(error);
				if (cb) cb(error);
			}
		});

	},

	getPatients: function(cb){
		var currentUser = Parse.User.current();
		var r = currentUser.relation("patients");
		r.query().find({
			success: function(patients){
				console.log(patients);
				if(cb) cb(patients);
			},
			error: function(error){
				if(cb) cb(error);
			}
		});
	},

	updateCurrentUser: function(data, cb){
		console.log("Server Requests updateCurrentUser");
		var currentUser = Parse.User.current();

		currentUser.save(data, {
			success: function(currentUser) {
				// Execute any logic that should take place after the object is saved.
				console.log("User update success");
				console.log(currentUser);
				if(cb) return cb(currentUser);
			},
			error: function(currentUser, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
				if(cb) return cb(error);
			}
		});
	},

	addToFollowingPatientList: function(userID, cb){
		var currentUser = Parse.User.current();

		console.log(userID);
		var userObject = new Parse.Query(Parse.User).equalTo("objectId", userID);
		userObject.find({
			success: function(results){
							
				if(results.length > 0){
					var relation = currentUser.relation("patients");

					// for(var i = 0; i < results.length; i++){
					// 	//Create and save relation
					relation.add(results[0]);	
					// }


					currentUser.save(null, 
							{ 
								success: function(response){
									if (cb) return cb(response);
								},
								error: function(response, error){
									consolelog("patient save fail");
									if (cb) return cb(error);
								}
							}
					);		

				} else {
					if(cb) cb(new Parse.Error("-1", "Could not follow user."));
				}

				// if (cb) cb(results);
			},

			error: function(error){

				if(cb) cb(error);
			}
		})
	},

	getEntries: function (cb) {
		console.log("getEntries");
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry).equalTo("createdBy", Parse.User.current());
		queryObject.ascending("createdAt");
		queryObject.find({
			success: function (results) {
				console.log(results);
				if (cb) {
					entries = [];
					for (var i = 0; i < results.length; i++) {
						entries.push(parseEntry(results[i]));
					}
					cb(entries);
				}
			},
			error: function (error) {
				console.log(error);
			}
		})
	},

	saveDrawing: function (data, cb) {
		var image_data = data.substring(str.indexOf(',') + 1);

		console.log(image_data);
	}
};

module.exports = ServerRequests;
