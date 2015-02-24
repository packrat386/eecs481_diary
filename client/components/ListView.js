var React = require('react');
var Router = require('react-router');
var EntryList = require('./EntryList');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var SelectedEntryStore = require('../stores/SelectedEntryStore');
var DiaryActions = require('../actions/DiaryActions');
var EntryTextView = require('./EntryTextView');

function getEntries(){
	return {
		entries: DiaryEntryStore.getEntries(),
		currentSelected: SelectedEntryStore.currentSelected()
	};
}

var ListView = React.createClass({

	getInitialState: function(){
		DiaryActions.getAllEntries();
		return getEntries();
	},

	componentDidMount: function() {
		DiaryEntryStore.addChangeListener(this._onChange);
		SelectedEntryStore.addChangeListener(this._onSelectionChange);
	},

	componentWillUnmount: function() {
		DiaryEntryStore.removeChangeListener(this._onChange);
		SelectedEntryStore.removeChangeListener(this._onSelectionChange);
	},

	_onChange: function(){
		this.setState({
			entries: DiaryEntryStore.getEntries()
		});
	},

	_onSelectionChange: function(){

		this.setState({
			currentSelected: SelectedEntryStore.currentSelected()
		});
	},

	render: function(){
		console.log(this.state);
		return (
			<div className="container">
				<h3>Diary Entries</h3>
				<div className="list-group col-xs-12 col-sm-12 col-md-4">
					<EntryList
						allEntries={this.state.entries}
						currentSelected={this.state.currentSelected}/>
				</div>

				<div className="col-xs-12 col-sm-12 col-md-8">
					<EntryTextView entry={this.state.currentSelected}/>
				</div>
			</div>

		);
	}
});

module.exports = ListView;
