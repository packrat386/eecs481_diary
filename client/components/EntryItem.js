var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var _ = require('underscore');
var moment = require('moment');

var EntryItem = React.createClass({

	_onClick: function(event){
		event.preventDefault();
		if(this.props.selectionCallback){
			this.props.selectionCallback(this.props.entry);
		}
		// DiaryActions.setSelected(this.props.entry);
	},

	render: function(){
		var currentClass = "list-group-item";
		if(this.props.isSelected){
			currentClass += " active";
		}
		// var a = performance.now();
		// var dateString = moment(this.props.entry.createdAt, "ddd MMM DD YYYY hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm:ss a");
		console.log(this.props.entry);
		console.log(this.props.entry.createdAt);
		var dateString = moment(this.props.entry.createdAt, "ddd MMM DD YYYY hh:mm:ss").format("dddd, MMMM Do YYYY, h:mm:ss a");
		// var b = performance.now();
		// console.log("dateString formatting " + (b-a) + "ms");
		return (
			<a href="#" className={currentClass} onClick={this._onClick}>
				<b>{this.props.entry.get("data").title}</b>
			 	<br/>
			 	{dateString}
			</a>
		);
	}

	// _onChange:function(){
	// 	if(SelectedEntryStore.currentSelected() === this.state.entry.id){
	// 		this.setState({
	// 			isSelected: true
	// 		});
	// 	} else {
	// 		this.setState({
	// 			isSelected: false
	// 		});
	// 	}
	// }
});

module.exports = EntryItem;