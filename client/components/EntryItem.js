var React = require('react');
var Router = require('react-router');
var SelectedEntryStore = require('../stores/SelectedEntryStore');
var DiaryActions = require('../actions/DiaryActions');

var EntryItem = React.createClass({

	_onClick: function(event){
		event.preventDefault();
		DiaryActions.setSelected(this.props.entry);
	},

	render: function(){
		var currentClass = "list-group-item";
		if(this.props.isSelected === true){
			currentClass += " active";
		}

		return (
			<a href="#" className={currentClass} onClick={this._onClick}>
				Title: {this.props.entry.title}
			 	<br/>
			 	({this.props.entry.id})
			</a>
		);
	},

	_onChange:function(){
		if(SelectedEntryStore.currentSelected() === this.state.entry.id){
			this.setState({
				isSelected: true
			});
		} else {
			this.setState({
				isSelected: false
			});
		}
	}
});

module.exports = EntryItem;