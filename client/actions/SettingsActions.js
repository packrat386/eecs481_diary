var SettingsConstants = require('../constants/SettingsConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');


var SettingsActions = {
	toggleActive: function(key){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.TOGGLE_ACTIVE,
			data: key
		});
	},
	deletePatients: function(){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.DELETE_PATIENTS,
			data: ""
		});
	},

	addPatient: function(patient){
		AppDispatcher.handleAction({
			actionType: SettingsConstants.ADD_PATIENT,
			data: patient
		});
	}
};
module.exports = SettingsActions;
