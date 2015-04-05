var SettingsConstants = require('../constants/SettingsConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');

var CurrentUserStore = require('../stores/CurrentUserStore');
var CaseStore = require('../stores/CaseStore');


var SettingsActions = {
	toggleActive: function(patient){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.TOGGLE_ACTIVE,
			data: patient
		});

		console.log("Toggle active");
	},

	deletePatients: function(cb){
		var patientsToDelete = CaseStore.getCases(true);

		ServerRequests.deleteFromFollowingPatientList(patientsToDelete, function(response){
			if(response instanceof Parse.Error){

			} else {
				AppDispatcher.handleAction({
					actionType: SettingsConstants.DELETE_PATIENTS,
					data: ""
				});
			}
			if(cb) return cb(response);
		});



	},

	addPatient: function(patient, cb){
		if(CaseStore.getCase(patient)){
			if(cb) cb(new Parse.Error("-1", "Already following user."));
			return;
		} else if(patient === CurrentUserStore.getUser().id){
			if(cb) cb(new Parse.Error("-1", "Can't add yourself."));
			return;
		}

		console.log("AddPatient");
		ServerRequests.addToFollowingPatientList(patient, function(response){
			if(response instanceof Parse.Error){
				console.log("AddPatient error");
				if(cb) return cb(response);
			} else {
				console.log("AddPatient success");

				this.updatePatients();
				if(cb) return cb(true);
			}	
		}.bind(this));

	},

	updatePatients: function(cb){
		var currentUser = CurrentUserStore.getUser();
		ServerRequests.getPatients(function(response){
			if(response instanceof Parse.Error){
				if(cb) return cb(response);
			} else {
				AppDispatcher.handleAction({
					actionType: SettingsConstants.LOAD_PATIENTS,
					data: response
				});
				if(cb) return cb(response);
			}
		});


	},
};
module.exports = SettingsActions;
