var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;


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


