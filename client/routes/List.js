var React = require('react');
var PanelList = require('../components/PanelList');
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');

function reverseEntries(entries){
	return Array.prototype.slice.call(entries).reverse();
}

var List =  React.createClass({

	componentWillMount: function(){
		DiaryActions.getAllEntries();
	},

	getInitialState: function(){
		return {
			entries: []
		}
	},

	componentDidMount: function() {
		DiaryEntryStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		DiaryEntryStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		var newEntries = reverseEntries(DiaryEntryStore.getEntries());

		this.setState({
			entries: newEntries
		});
	},

	render: function(){
		console.log(this.state.entries);
		return (
				<div>
					<PanelList entries={this.state.entries} />
				</div>
			)
	}

});

module.exports = List;