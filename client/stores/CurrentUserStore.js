var AppDispatcher = require('../dispatcher/AppDispatcher');
var DiaryConstants = require('../constants/DiaryConstants');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var _current_user = null;

function login(user){
	console.log("Login CurrentUserStore");
	_current_user = user;
}

function logout(){
	_current_user = null;
}

function update(user){
	console.log("Update CurrentUserStore");
	_current_user = user;
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
	},

	loggedIn: function(){
		if(_current_user) return true;

		return false;
	},

	setUser: function(user){
		_current_user = user;
	}
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case DiaryConstants.LOGIN:
			login(action.data);
			CurrentUserStore.emitChange();
			break;


		case DiaryConstants.LOGOUT:
			logout();
			CurrentUserStore.emitChange();
			break;

		case DiaryConstants.UPDATE_USER:
			update(action.data);
			CurrentUserStore.emitChange();
			break;

		default:
			return true;
	}

	return true;
});

module.exports = CurrentUserStore;