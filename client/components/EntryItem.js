var React = require('react/addons');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var SelectedEntryStore = require('../stores/SelectedEntryStore');

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

	render: function(){
		var cx = React.addons.classSet;

		var currentClass = cx({
			'list-group-item': true,
			'active': this.state.isEditing
		});
		return (
			<a href="#" className={currentClass}>
			Title: {this.state.entry.title} ({this.state.entry.id})
			</a>
		);
	},

	_onChange:function(){
		if(SelectedEntryStore.currentSelected){
			this.setState({
				isSelected: true
			});
		}
	}
});

module.exports = EntryItem;