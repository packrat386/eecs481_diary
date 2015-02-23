var DiaryConstants = require('../constants/DiaryConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');

var DiaryActions = {
	addEntry: function(data, cb){
		ServerRequests.addEntry(data, function(data){
			if(data){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_ADD,
					data: data
				});

				if(cb) cb(true);
			} else {
				if(cb) cb(false);
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
				for(var i = 0; i < entries.length; i++){
					AppDispatcher.handleAction({
						actionType: DiaryConstants.DIARY_ADD,
						data: entries[i]
					});
				}

			}
		});
	},

	setSelected: function(entry){
		AppDispatcher.handleAction({
			actionType: DiaryConstants.DIARY_SELECT,
			data: entry
		});
	},

	updateEntry: function(entry){
		ServerRequests.updateEntry(entry, function(response){
			if(response){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_UPDATE,
					data: response
				});
			} else {
				console.log("Failed to update");
			}
		})
		// AppDispatcher.handleAction({
		// 	actionType: DiaryConstants.DIARY_UPDATE,
		// 	data: entry
		// });
	},

	clearStores: function(){
		AppDispatcher.handleAction({
			actionType: DiaryConstants.CLEAR_STORES,
			data: null
		})
	}
};

module.exports = DiaryActions;