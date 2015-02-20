var DiaryConstants = require('../constants/DiaryConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ServerRequests = require('../utils/ServerRequests');

var DiaryActions = {
	addEntry: function(data){
		ServerRequests.addEntry(data, function(data){
			if(data){
				AppDispatcher.handleAction({
					actionType: DiaryConstants.DIARY_ADD,
					data: data
				});
			} else {
				console.log("Failed to add entry");
			}
		});
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
	}
};

module.exports = DiaryActions;