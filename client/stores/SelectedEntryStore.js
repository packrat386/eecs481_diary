var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;


var _selected_entry = '';

function selectEntry(data){
	_selected_entry = data.id;
}

function clearStore(){
	_selected_entry = '';
}

var SelectedEntryStore = _.extend({}, EventEmitter.prototype, {
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

	currentSelected: function(){
		return _selected_entry;
	}
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;
	var text;

	switch(action.actionType) {
		case DiaryConstants.DIARY_SELECT:
			selectEntry(action.data);
			break;

		case DiaryConstants.CLEAR_STORES:
			clearStore();
			break;

		default:
			return true;
	}

	SelectedEntryStore.emitChange();

	return true;
});

module.exports = SelectedEntryStore;


