var React = require('react');
var Router = require('react-router');
var EntryList = require('./EntryList');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var DiaryActions = require('../actions/DiaryActions');
var EntryTextView = require('./EntryTextView');

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
		console.log("onListChange");
		console.log(getEntries());
		this.setState(getEntries());
	},

	render: function(){
		console.log(this.state.entries);
		return (
			<div className="list-group">
				<EntryList allEntries={this.state.entries} />
				<EntryTextView />
			</div>
		);
	}
});

module.exports = ListView;