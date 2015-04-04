var DiaryConstants = require('../constants/DiaryConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');


var DiaryActions = {
	addEntry: function(data, cb){
		ServerRequests.addEntry(data, function(result_data){
			if(data){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_ADD,
					data: result_data
				});

				if(cb) cb(result_data);
			} else {
				if(cb) cb(null);
				console.log("Failed to add entry");
			}
		});
	},

	removeEntry: function(data, cb){
		ServerRequests.removeEntry(data, function(response){
			if(response){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_REMOVE,
					data: data
				});

				if(cb) cb(true);
			} else {
				if(cb) cb(false);
			}
		})
	},

	getAllEntries: function(){
		ServerRequests.getEntries(function(entries){
			if(entries){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_ADD,
					data: entries
				});
			}
		});
	},

	setSelected: function(entry){
		AppDispatcher.handleAction({
			actionType: DiaryConstants.DIARY_SELECT,
			data: entry
		});
	},

	updateEntry: function(entry, cb){
		console.log(entry);
		ServerRequests.updateEntry(entry, function(response){
			if(response instanceof Parse.Error){
				if(cb) cb(response);
				console.log("Failed to update");
			} else {
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_UPDATE,
					data: response
				});
				console.log("DiaryActions updateEntry");
				console.log(response);
				if(cb) cb(response);
			}
		})
	},

	clearStores: function(){
		AppDispatcher.handleAction({
			actionType: DiaryConstants.CLEAR_STORES,
			data: null
		})
	},

	login: function(credentials, cb){
		ServerRequests.login(credentials.username, credentials.password, function(response){

			if(!(response instanceof Parse.Error)){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.CLEAR_STORES,
					data: response
				});

				AppDispatcher.handleAction({
					actionType: DiaryConstants.LOGIN,
					data: response
				});


				if(cb) cb(response);
			} else {
				if(cb) cb(response);
			}

		});
	},

	logout: function(){
		ServerRequests.logout();

		AppDispatcher.handleAction({
			actionType: DiaryConstants.CLEAR_STORES
		});

		AppDispatcher.handleAction({
			actionType: DiaryConstants.LOGOUT
		});
	},

	updateCurrentUser: function(data, cb){
		ServerRequests.updateCurrentUser(data, function(currentUser){
			if(currentUser instanceof Parse.Error){
				console.log(currentUser);
				if(cb) cb(currentUser);

			} else {
				AppDispatcher.handleAction({
					actionType: DiaryConstants.UPDATE_USER,
					data: currentUser
				});

				if(cb) cb(currentUser);
			}
		});
	},

	createUser: function(data, cb){
		ServerRequests.createUser(data, function(response){
			if(response instanceof Parse.Error){
				console.log(response);
				if(cb) cb(response);
			} else {
				AppDispatcher.handleAction({
					actionType: DiaryConstants.CLEAR_STORES
				});

				AppDispatcher.handleAction({
					actionType: DiaryConstants.LOGIN,
					data: response
				});

				if(cb) cb(response);
				// this.transitionTo('/main');
			}
		}.bind(this));
	}
};

module.exports = DiaryActions;