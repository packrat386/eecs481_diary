var SettingsConstants = require('../constants/SettingsConstants');
var StaffConstants = require('../constants/StaffConstants');
var DiaryConstants = require('../constants/DiaryConstants');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');

var CurrentUserStore = require('../stores/CurrentUserStore');
var CaseStore = require('../stores/CaseStore');

var StaffActions = {
	selectPatient: function(patient){
		AppDispatcher.handleAction({
			actionType: StaffConstants.SELECT_ACTIVE,
			data: patient
		});

		console.log("Select active");
	},

	loadPatientEntries: function(cb){
		var currentUser = CurrentUserStore.getUser();
		var selectedPatientID = CaseStore.getLastSelected();
		if (selectedPatientID){
			ServerRequests.getPatientEntries(selectedPatientID, function(response){
				if(response instanceof Parse.Error){
					if(cb) return cb(response);
				} else {
					AppDispatcher.handleAction({
						actionType: DiaryConstants.DIARY_ADD,
						data: response
					});
					if(cb) return cb(response);
				}
			});
		}
		else{
			ServerRequests.getEntries(function(entries){
				if(entries){
					AppDispatcher.handleAction({
						actionType: DiaryConstants.DIARY_ADD,
						data: entries
					});
				}
			});
		}



	},
};
module.exports = StaffActions;
