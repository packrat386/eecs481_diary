var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');


var _diary_entries = [];

function addEntry(data){
	console.log(data);
	if(data.constructor === Array){
		// for(var i = 0; i < data.length; i++){
		// 	_diary_entries[data[i].id] = data[i];	
		// }
		_diary_entries = data;
	} else {
		_diary_entries.push(data);	
	}

}

function updateEntry(data){
	for(var i = 0; i < _diary_entries.length; i++){
		if(_diary_entries[i].id === data.id){
			_diary_entries[i] = data;
			return true;
		}
	}
	return false;
}

function clearStore(){
	_diary_entries = [];
}

function removeEntry(entry_id){
	_diary_entries = _diary_entries.filter(function( obj ) {
    	return obj.id !== entry_id;
	});
	// delete _diary_entries[entry_id];
}

var DiaryEntryStore = _.extend({}, EventEmitter.prototype, {
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

	getEntries: function(){
		return _diary_entries;
	},

	getEntry: function(entry_id){
		for(var i = 0; i < _diary_entries.length; i++){
			if(_diary_entries[i].id == entry_id){
				return _diary_entries[i];
			}
		}

		return null;
	},

	hasEntry: function(entry_id){
		for(var i = 0; i < _diary_entries.length; i++){
			if(_diary_entries[i].id == entry_id){
				console.log('hasEntry');
				return true;
			}
		}
		return false;
	},

	getDays: function(){
		var days = {};
		for(var i = 0; i < _diary_entries.length; i++){
			var mom = moment(_diary_entries[i].createdAt, "ddd MMM DD YYYY hh:mm:ss");
			var str = mom.format("MM-DD-YYYY");
			if(!(str in days)){
				days[str] = true;
			}
		}

		return Object.keys(days);
	},

	//Format MM-DD-YYYY ex. 12-25-1995
	//Dictionary returns date: [entries]
	getDateEntryDictionary: function(){
		var dayDict = {};
		for(var i = 0; i < _diary_entries.length; i++){
			var mom = moment(_diary_entries[i].createdAt, "ddd MMM DD YYYY hh:mm:ss");
			var str = mom.format("MM-DD-YYYY");
			if(!(str in daysDict)){
				daysDict[str] = [];
			} 
			daysDict[str].push(_diary_entries[i]);
		}

		return daysDict;
	},

	//Given a string ofo MM-DD-YYYY format, return a list of elements on that day
	getEntriesOnDay: function(day_str){
		var moment_obj = moment(day_str, "MM-DD-YYYY");
		var entries = [];
		for(var i = 0; i < _diary_entries.length; i++){
			var mom = moment(_diary_entries[i].createdAt, "ddd MMM DD YYYY hh:mm:ss");
			if(moment_obj.isSame(mom, 'day')){
				entries.push(_diary_entries[i]);
			}
		}

		return entries;
	}
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case DiaryConstants.DIARY_ADD:
			addEntry(action.data);
			DiaryEntryStore.emitChange();
			break;

		case DiaryConstants.DIARY_REMOVE:
			removeEntry(action.data.id);
			DiaryEntryStore.emitChange();
			break;

		case DiaryConstants.DIARY_UPDATE:
			updateEntry(action.data);
			DiaryEntryStore.emitChange();
			break;

		case DiaryConstants.CLEAR_STORES:
			clearStore();
			DiaryEntryStore.emitChange();
			break;

		default:
			return true;
	}



	return true;
});

module.exports = DiaryEntryStore;


