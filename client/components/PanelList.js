var React = require('react');
var GeneralPanel = require('./PanelViews/GeneralPanel');

var types = ["text", "doodle", "visit", "mood"];

var CurrentUserStore = require('../stores/CurrentUserStore');

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Button = require('react-bootstrap').Button;

var DatePicker = require('react-datepicker');
var moment = require('moment');



var PanelList =  React.createClass({

	getInitialState: function(){
		return {
			typeFilter: null,
			authorFilter: null,
			selectedDate: null
		}
	},

	_inFilter: function(entry){
		if(this.state.typeFilter 
			&& this.state.typeFilter !== entry.get("type")){
			return false;
		} else if(this.state.authorFilter &&
			(
				(this.state.authorFilter === "me" && (entry.get("createdBy").id != CurrentUserStore.getUser().id))
				|| 
				(this.state.authorFilter === "others" && entry.get("createdBy").id == CurrentUserStore.getUser().id))){
			return false;
		}


		return true;
	},

	_hasFilter: function(){
		if(this.state.typeFilter ||
			this.state.authorFilter){
			return true;
		}

		return false;
	},

	_changeTypeFilter: function(selectedKey){
		console.log(selectedKey);
		this.setState({
			typeFilter: selectedKey
		});
	},

	_changeAuthorFilter: function(selectedKey){
		this.setState({
			authorFilter: selectedKey
		})
	},

	_cancelFilter: function(){
		var newObj = {};
		for(key in this.state){
			this.state[key] = null;
		}

		this.setState(newObj);
	},

	selectDate: function(date){
		console.log(date);
		this.setState({
			selectedDate: date
		});
	},

	render: function(){

		var filteredEntries = this.props.entries.map(function(entry){
			if(this._inFilter(entry)){
				return entry;
			}
		}.bind(this));

		var entries = filteredEntries.map(function(entry){
			if(entry){
				return <GeneralPanel key={entry.id} entry={entry} />;	
			}

		}.bind(this));

		var filterMessages = [];
		if(this.state.typeFilter){
			filterMessages.push(<p key="type">Type: {this.state.typeFilter.capitalizeFirstLetter()} </p>);
		}
		if(this.state.authorFilter){
			filterMessages.push(<p key="author">Author: {this.state.authorFilter.capitalizeFirstLetter()}</p>);
		}

		if(this._hasFilter()){
			filterMessages.push(<Button bsStyle='primary' key="btn" onClick={this._cancelFilter}>Cancel Filter</Button>);
		}


		var typeDropdowns = types.map(function(item){
			return <MenuItem eventKey={item} key={item}>{item.capitalizeFirstLetter()}</MenuItem>
		});

		var author_types = ["me", "others"]
		var authorDropdowns = author_types.map(function(type){
			return <MenuItem eventKey={type} key={type}>{type.capitalizeFirstLetter()}</MenuItem>
		});

		return (
			<div>
	
				<DropdownButton title='Post Type Filter' onSelect={this._changeTypeFilter}>
					{typeDropdowns}
				</DropdownButton>
				<DropdownButton title='Author Filter' onSelect={this._changeAuthorFilter}>
					{authorDropdowns}
				</DropdownButton>
				{filterMessages}
				{entries} 
			</div>
			);
	}

});

module.exports = PanelList;