var DiaryConstants = require('../constants/DiaryConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');

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
		ServerRequests.updateEntry(entry, function(response){
			if(response){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_UPDATE,
					data: response
				});
				if(cb) cb(response);
			} else {
				if(cb) cb(null);
				console.log("Failed to update");
			}
		})
	},

	clearStores: function(){
		AppDispatcher.handleAction({
			actionType: DiaryConstants.CLEAR_STORES,
			data: null
		})
	}
};

module.exports = DiaryActions;