//Parse used for prototyping only

var Parse = require('./ParseInit');
var Router = require('react-router');
var _ = require('underscore');
var moment = require('moment');

var parseEntry = function (entry) {
	return entry;
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


					if(user.attributes.user_type === "patient"){
						//Create a new case entry
						caseEntry.save({patient: Parse.User.current()},
								{
									success: function (new_caseEntry) {
										console.log("Added entry");

											//Create and save relation
											console.log("Saved new case");
											if (cb) return cb(user);
									},
									error: function (entry, response) {
										console.log("Error adding");
										console.log(error);
										if (cb) return cb(response);
									}
								});
					} else {
						if(cb) return cb(user);
					}

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
		// {id, data}

		var currentUser = Parse.User.current();

		if (!currentUser) {
			if (cb) cb(null);
			return null;
		}

		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var diaryEntry = new DiaryEntry();

		//Create new ACL access
		var newACL = new Parse.ACL(currentUser);
		console.log(diary_entry);

		if(diary_entry.ACL){
			var sharedWith = [];
			for(i = 0; i < diary_entry.ACL.length; i++){
				newACL.setReadAccess(diary_entry.ACL[i], true);
				sharedWith.push(diary_entry.ACL[i]);
			}
			diaryEntry.set("shared_with", sharedWith);
		}

		diaryEntry.setACL(newACL);
		diaryEntry.set("createdBy", currentUser);

		// default type of diary entry is text
		if(diary_entry.type) {
			diaryEntry.set("type", diary_entry.type);
		}
		else{
			diaryEntry.set("type", "text");
		}
		//Check if large photo exists
		if("photo" in diary_entry.data && diary_entry.data["photo"] !== null){
		    var parseFile = new Parse.File(
		    	"visit.png",
				{
					base64:
					diary_entry.data["photo"].replace(/^data:image\/(png|jpeg);base64,/, "")
				});
			diaryEntry.set("photo", parseFile);

			delete diary_entry.data["photo"];
		}

		diaryEntry.set("data", diary_entry.data);

		diaryEntry.save(null,
			{
				success: function (entry) {
					console.log("Added entry");
					if (cb) cb(entry);
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
						if (cb) return cb(true);
					},
					error: function (deleted_entry, error) {
						console.log(error);
						if (cb) return cb(false);
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

				// diaryEntry.set("title", diary_entry.title);
				// diaryEntry.set("text", diary_entry.text);

				// diaryEntry.set("data", diary_entry.data);

				// if (diary_entry.canvasImage) {
				// 	// diaryEntry.set("canvasImage", new Parse.File("canvas.png", {base64:diary_entry.canvasImage}));
				// 	diaryEntry.set("canvasImage", diary_entry.canvasImage);
				// }

				diaryEntry.save({data: diary_entry.data}, {
					success: function(response){
						console.log(diary_entry);
						console.log(response);

						console.log("updateEntrySuccess");
						if(cb) return cb(response);
					},
					error: function(response, error){
						if(cb) return cb(error);
					}
				});

				// console.log("Server requests updateEntry");
				// console.log(parseEntry(diaryEntry));

				// if (cb) cb(parseEntry(diaryEntry));
			},
			error: function (diaryEntry, error) {
				console.log(error);
				if (cb) cb(error);
			}
		});

	},

	getPatients: function(cb){
		var currentUser = Parse.User.current();
		var CaseObject = Parse.Object.extend("Case");

		//Get Case First
		// console.log(Parse.Query("Case"));
		var userType = currentUser.get("user_type");
		if (userType){
			console.log("User is type: " + userType);
		}
		else{
			console.log("Cannot find user type, setting to default type of \"visitor\"");
			userType = "visitor";
		}

		//Patients only need to know visitors
		if(userType === "patient"){
			var q = new Parse.Query(CaseObject).equalTo("patient", currentUser);
			q.find({
				success: function(cases){
					if(cases.length > 0){
						var relation = cases[0].relation("visitor");
						relation.query().find({
							success: function(users){
								console.log(users);
								if(cb) return cb(users);
							},
							error: function(error){
								if(cb) return cb(error);
							}
						})
					}
				},
				error: function(error){
					if(cb) return cb(error);
				}
			})
		} else {
			var q = new Parse.Query(CaseObject).containedIn(userType, [currentUser]);
			q.include("patient");
			q.find({
				success: function(cases){

					console.log("get patients");
					var patients = [];

					//Find all patients within the cases that you're in
					for(var i = 0; i < cases.length; i++){
						var patient = cases[i].get("patient");
						patients.push(patient);
						console.log("Patient " + i + 1 + ": "+patient);
					}

					if(cb) cb(patients);
				},
				error: function(error){
					if(cb) cb(error);
				}
			});
		}


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
			success: function(userResults){

				console.log(userResults);
				if(userResults.length > 0 && userResults[0].get("user_type") === "patient"){

					var Case = Parse.Object.extend("Case");
					var caseObject = new Parse.Query(Case).equalTo("patient", userResults[0]);
					caseObject.find({
						success: function(caseResults){
							if(caseResults && caseResults.length > 0){
								console.log(caseResults);
								var relation = caseResults[0].relation(currentUser.get("user_type"));
								relation.add(currentUser);

								caseResults[0].save(null,
									{
										success: function(response){
											if(cb) return cb(response);
										},
										error: function(response){
											console.log(response);
											if(cb) return cb(response);
										}
									}
								)
							}

						},
						error: function(error){
							if(cb) return cb(new Parse.Error("-1", "Could not save case."));
						}
					});

				} else {
					var errorMessage = "Could not follow user.";
					if(userResults.length == 0){
						errorMessage = "Could not find user."
					} else if (userResults[0].get("user_type") === "patient"){
						errorMessage = "User is not a patient.";
					}
					if(cb) return cb(new Parse.Error("-1", errorMessage));
				}

			},

			error: function(error){

				if(cb) cb(error);
			}
		})
	},

	deleteFromFollowingPatientList: function(patientsToDelete, cb){
		var currentUser = Parse.User.current();

		//Promises make me cry
		var promise = Parse.Promise.as();
		promise = promise.then(function(){
			_.each(patientsToDelete, function(patient){
				var promise2 = Parse.Promise.as();
				promise2.then(function(){

					var CaseObject = Parse.Object.extend("Case");
					var query = new Parse.Query(CaseObject).equalTo("patient", patient);
					return query.find();
				}).then(function(caseObj){

					console.log(caseObj[0]);
					var relation = caseObj[0].relation(currentUser.get("user_type"));
					relation.remove(currentUser);
					return caseObj[0].save();
				});
			});

			var promise3 = Parse.Promise.as();
			return promise3;
		}).then(function(){
			if(cb) cb(true);
		});
	},

	getEntries: function (cb) {
		console.log("getEntries");
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
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

	getPatientEntries: function (patientId, cb) {
		console.log("getEntries");
		var DiaryEntry = Parse.Object.extend("DiaryEntry");
		var queryObject = new Parse.Query(DiaryEntry);
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
	},

	refreshUser: function(){
		if(Parse.User.current()){
			Parse.User.current().refresh();
		}
	}

};

module.exports = ServerRequests;
