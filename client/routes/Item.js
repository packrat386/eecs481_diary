var React = require('react');
var Parse = require('parse').Parse;
var GeneralPanel = require('../components/PanelViews/GeneralPanel');
var PanelList = require('../components/PanelList');
var Authentication = require('../utils/Authentication');
var _ = require('underscore');
var ParseReact = require('parse-react');
var ChangeStore = require('../stores/ChangeStore');


//For some reason, ParseReact flattens the object 
//removing many of the useful Parse.Object functions
//This function re-wraps the 'get' function
function processItem(item){
	item["get"] = function(string){
		if(string == "id"){
			return this.objectId;
		} 
		else if(string == "createdBy"){
			return {
				id: this.createdBy.objectId
			}
		}
		return this[string];
	}

	item["id"] = item["objectId"];

	item["getACL"] = function(){
		return item.ACL;
	}
}

var Item = React.createClass({
	mixins: [ParseReact.Mixin],

	contextTypes: {
		router: React.PropTypes.func
	},

	observe: function() {
		// Subscribe to a DiaryEntry object
		return {
		  item: (new Parse.Query('DiaryEntry').equalTo("objectId", 
		  	this.context.router.getCurrentParams().itemId))
		};
	},

	componentDidMount: function() {
		ChangeStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ChangeStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.refreshQueries();
	},

	render: function(){
		console.log(this.data.item);
		var itemComponent = null;

		if(this.data.item.length > 0){
			mutableObj = $.extend(true, {}, this.data.item[0]);
			processItem(mutableObj);
			itemComponent = (
				<GeneralPanel entry={mutableObj} />
			);
		} else {

		}

		return (
			<div>
				{itemComponent}
			</div>
		);
	}
});

module.exports = Item;

