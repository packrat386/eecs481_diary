var AppDispatcher = require('../dispatcher/AppDispatcher');
var SettingsConstants = require('../constants/SettingsConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _case_store = {};

function toggleActive(key){
	_case_store[key] = !_case_store[key];
}

function loadValues(array){
	_case_store = {};
	for(var i in array){
		_case_store[i] = false;
	}
}

function addPatient(patient){
	_case_store[patient] = false;
}

function deleteSelected(){
	for(key in _case_store){
		if(_case_store[key] === true){
			delete _case_store[key];
		}
	}
}

loadValues(["1", "2", "3"]);

var CaseStore = _.extend({}, EventEmitter.prototype, {
	emitChange: function(){
		this.emit('change');
	},

	// Add change listener
	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	// Remove change listener
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},

	getCases: function(isActive){
		if(isActive !== undefined){
			var selected_cases = [];
			for(key in _case_store){
				if(_case_store[key] === isActive){
					selected_cases.push(_case_store[key]);
				}
			}

			return selected_cases;

		} else 
			return Object.keys(_case_store).sort();
	},

	// getCases: function(isActive){
	// 	var active_cases = [];
	// 	for(key in _case_store){
	// 		if(_case_store[key] === true){
	// 			active_cases.push(_case_store[key]);
	// 		}
	// 	}

	// 	return active_cases;
	// },

	isActive: function(key){
		return _case_store[key];
	}
});

AppDispatcher.register(function(payload) {


	var action = payload.action;

	switch(action.actionType) {
		case SettingsConstants.TOGGLE_ACTIVE:
			toggleActive(action.data);
			CaseStore.emitChange();
			break;

		case SettingsConstants.ADD_PATIENT:
			addPatient(action.data);
			CaseStore.emitChange();
			break;

		case SettingsConstants.DELETE_PATIENTS:
			deleteSelected();
			CaseStore.emitChange();
			break;

		default:
			return true;
	}
	return true;
});

module.exports = CaseStore;