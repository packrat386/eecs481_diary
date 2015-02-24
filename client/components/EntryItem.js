var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var _ = require('underscore');

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

		return (
			<a href="#" className={currentClass} onClick={this._onClick}>
				Title: {this.props.entry.title}
			 	<br/>
			 	({this.props.entry.id})
			 	<br/>
			 	{this.props.entry.createdAt}
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