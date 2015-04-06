var AppDispatcher = require('../dispatcher/AppDispatcher');
var SettingsConstants = require('../constants/SettingsConstants');
var StaffConstants = require('../constants/StaffConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _case_store = {};
var _selected = {};
var _patient_entries = {};
var _last_selected = null;

function toggleActive(patient){
	_selected[patient.id] = !_selected[patient.id];
	if(_selected[patient.id]){
		_last_selected = patient.id;
	}
	else{
		_last_selected = null;
	}

}

function loadPatients(array){
	_case_store = {};
	for(var i=0; i < array.length; i++){
		_case_store[array[i].id] = array[i];
		_selected[array[i].id] = false;
	}
}

function loadPatientEntries(data){
	var id = data.id;
	var entries = data.entries;
	_patient_entries[id] = entries;
}

function addPatient(patient){
	_case_store[patient.id] = patient;
	_selected[patient.id] = false;
}

function deleteSelected(){
	for(key in _selected){
		if(_selected[key] === true){
			delete _case_store[key];
			delete _selected[key];
		}
	}
}

function selectCase(patient){
	for(key in _selected){
		if(_selected[key] === true){
			toggleActive(_case_store[key]);
		}
	}
	toggleActive(patient);
}

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
		var selected_cases = [];
		for(key in _case_store){
			if(isActive === undefined || (_selected[key] === isActive)){
				selected_cases.push(_case_store[key]);
			}
		}

		return selected_cases;
	},

	isActive: function(patient){
		return _selected[patient.id];
	},

	getCase: function(id){
		return _case_store[id];
	},

	numCases: function(){
		return Object.keys(_case_store).length;
	},
	getLastSelected: function(){
		return _last_selected;
	},

	getEntries: function(id){
		return _patient_entries[id];
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

		case SettingsConstants.LOAD_PATIENTS:
			loadPatients(action.data);
			CaseStore.emitChange();
			break;

		case StaffConstants.SELECT_ACTIVE:
			selectCase(action.data);
			CaseStore.emitChange();
			break;
		case StaffConstants.LOAD_PATIENT_ENTRIES:
			loadPatientEntries(action.data);
			CaseStore.emitChange();
			break;

		default:
			return true;
	}
	return true;
});

module.exports = CaseStore;
