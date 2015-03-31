var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _current_user = null;

function login(user){
	_current_user = user;
}

function logout(){
	_current_user = null;
}

var CurrentUserStore = _.extend({}, EventEmitter.prototype, {
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

	getUser: function(){
		return _current_user;
	}
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case DiaryConstants.LOGIN:
			login(action.data);
			break;


		case DiaryConstants.LOGOUT:
			logout();
			break;

		default:
			return true;
	}

	return true;
});

module.exports = CurrentUserStore;