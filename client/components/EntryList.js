var React = require('react');
var Router = require('react-router');
var EntryItem = require('./EntryItem');

var EntryList = React.createClass({

	getInitialState: function(){
		return {
			entries: this.props.allEntries
		};
	},

	componentWillReceiveProps: function(newProps){
		this.setState({
			entries: newProps.allEntries
		});
	},

	render: function(){
		console.log("Render EntryList");
		var entries = [];

		for(var key in this.state.entries){
			entries.push(<EntryItem key={key} entry={this.state.entries[key]} />);
		}

		return (
			<div className="list-group">
				{entries}
			</div>
		)
	}

});

module.exports = EntryList;