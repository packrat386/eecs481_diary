var React = require('react');
var Parse = require('parse').Parse;
var PanelList = require('../components/PanelList');
var DiaryActions = require('../actions/DiaryActions');
var DiaryEntryStore = require('../stores/DiaryEntryStore');

var Authentication = require('../utils/Authentication');


function reverseEntries(entries){
	return Array.prototype.slice.call(entries).reverse();
}

var List =  React.createClass({
	mixins: [Authentication],

	contextTypes: {
		router: React.PropTypes.func
	},

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
		console.log(this.context.router.getCurrentQuery());
		return (
				<div>
					<PanelList 
						entries={this.state.entries} 
						query={this.context.router.getCurrentQuery()}/>
				</div>
			)
	}

});

module.exports = List;