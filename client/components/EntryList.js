var React = require('react');
var Router = require('react-router');
var EntryItem = require('./EntryItem');

var EntryList = React.createClass({

	render: function(){

		var allEntries = this.props.allEntries;
		var entries = [];

		for(var key in allEntries){
			entries.push(<EntryItem key={key} entry={allEntries[key]} />);
		}

		return (
			<div className="list-group">
				{entries}
			</div>
		)
	}

});

module.exports = EntryList;