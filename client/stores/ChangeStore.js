var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

var ChangeStore = _.extend({}, EventEmitter.prototype, {
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
	}
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case DiaryConstants.DIARY_ADD:
			ChangeStore.emitChange();
			break;

		case DiaryConstants.DIARY_DELETE:
			ChangeStore.emitChange();
			break;

		case DiaryConstants.DIARY_UPDATE:
			ChangeStore.emitChange();
			break;

		case DiaryConstants.CLEAR_STORES:
			ChangeStore.emitChange();
			break;

		default:
			return true;
	}



	return true;
});

module.exports = ChangeStore;


