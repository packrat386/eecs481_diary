var React = require('react');
var Router = require('react-router');
var EntryList = require('./EntryList');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var DiaryActions = require('../actions/DiaryActions');

function getEntries(){
	return {
		entries: DiaryEntryStore.getEntries()
	};
}

var ListView = React.createClass({

	getInitialState: function(){
		DiaryActions.getAllEntries();
		return getEntries();
	},

	componentDidMount: function() {
		DiaryEntryStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		DiaryEntryStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState(getEntries());
	},

	render: function(){
		console.log(this.state.entries);
		return (
			<div className="list-group">
				<EntryList allEntries={this.state.entries} />
			</div>
		);
	}
});

module.exports = ListView;