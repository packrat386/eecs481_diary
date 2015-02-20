var React = require('react');
var Router = require('react-router');
var SelectedEntryStore = require('../stores/SelectedEntryStore');
var DiaryActions = require('../actions/DiaryActions');

var EntryItem = React.createClass({

	getInitialState: function(){
		return {
			entry: this.props.entry,
			isSelected: false
		};
	},

	// Add change listeners to stores
	componentDidMount: function() {
		SelectedEntryStore.addChangeListener(this._onChange);
	},

  	// Remove change listers from stores
	componentWillUnmount: function() {
		SelectedEntryStore.removeChangeListener(this._onChange);
	},

	_onClick: function(event){
		event.preventDefault();
		DiaryActions.setSelected(this.state.entry);
	},

	render: function(){
		// var cx = React.addons.classSet;

		var currentClass = "list-group-item";
		if(this.state.isSelected){
			currentClass += " active";
		}

		return (
			<a href="#" className={currentClass} onClick={this._onClick}>
			Title: {this.state.entry.title} ({this.state.entry.id})
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