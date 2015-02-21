var React = require('react');
var Router = require('react-router');
var EntryItem = require('./EntryItem');
var DiaryActions = require('../actions/DiaryActions');
var SelectedEntryStore = require('../stores/SelectedEntryStore');

var EntryList = React.createClass({
	render: function(){
		var entries = [];

		for(var key in this.props.allEntries){
			var isSelected=false;
			if((this.props.currentSelected) &&
				this.props.allEntries[key].id === this.props.currentSelected){
				isSelected = true;
			}
			entries.push(<EntryItem key={key} entry={this.props.allEntries[key]} isSelected={isSelected} />);
		}

		return (
			<div className="list-group">
				{entries}
			</div>
		)
	}

});

module.exports = EntryList;