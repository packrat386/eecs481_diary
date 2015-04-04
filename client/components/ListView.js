var React = require('react');
var Router = require('react-router');
var EntryList = require('./EntryList');
var DiaryEntryStore = require('../stores/DiaryEntryStore');
var DiaryActions = require('../actions/DiaryActions');
var EntryTextView = require('./EntryTextView');
var _ = require('underscore');

function reverseEntries(entries){
	return Array.prototype.slice.call(entries).reverse();
}

var ListView = React.createClass({

	getInitialState: function(){
		DiaryActions.getAllEntries();
		var initialEntries = reverseEntries(DiaryEntryStore.getEntries());
		var initialSelected = null;
		if(initialEntries.length > 0){
			initialSelected = initialEntries[0];
		}

		return {
			entries: initialEntries,
			currentSelected: initialSelected
		};
	},

	validateSelection: function(){
		//If no selected, select top
		if(!this.state.currentSelected){
			if(this.state.entries){
				this.setState({
					currentSelected: this.state.entries[0]
				});
			}
		} else if(!DiaryEntryStore.hasEntry(this.state.currentSelected.id)){
			if(this.state.entries){
				this.setState({
					currentSelected: this.state.entries[0]
				});
			}
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
		var newSelected = this.state.currentSelected;
		if(newEntries.length > 0){

			if((!this.state.currentSelected) || 
				!(DiaryEntryStore.hasEntry(this.state.currentSelected.id))){

				newSelected = newEntries[0];
			}
		} else {
			newSelected = null;
		}

		this.setState({
			entries: newEntries,
			currentSelected: newSelected 
		});
	},

	_selectionCallback: function(entry, cb){
		if(this.state.currentSelected.id == entry.id){
			return;
		}
		this.setState({
			currentSelected: entry
		});
	},

	render: function(){

		return (
			<div>
				<h3>Diary Entries</h3>
				<div className="list-group col-xs-12 col-sm-12 col-md-4">
					<EntryList
						allEntries={this.state.entries}
						currentSelected={this.state.currentSelected}
						selectionCallback={this._selectionCallback}/>
				</div>

				<div className="col-xs-12 col-sm-12 col-md-8">
					<EntryTextView initialEntry={this.state.currentSelected}/>
				</div>
			</div>

		);
	}
});

module.exports = ListView;
