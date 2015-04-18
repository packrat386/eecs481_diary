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
		var date = null;
		if(this.props.query.date){
			date=moment(this.props.query.date, "MM-DD-YYYY")
		}
		return {
			typeFilter: null,
			authorFilter: null,
			dateFilter: date
		}
	},

	componentWillMount: function(){
	},

	_inFilter: function(entry){
		if(this.state.typeFilter 
			&& this.state.typeFilter !== entry.get("type")){
			return false;
		} else if(this.state.authorFilter &&
				((this.state.authorFilter === "me" && 
					(entry.get("createdBy").id != CurrentUserStore.getUser().id))
				|| 
				(this.state.authorFilter === "others" && 
					entry.get("createdBy").id == CurrentUserStore.getUser().id))
				){
			return false;
		} else if(this.state.dateFilter && 
			(moment(entry.createdAt, "ddd MMM DD YYYY hh:mm:ss").format("MM-DD-YYYY")
				!== this.state.dateFilter.format("MM-DD-YYYY")))
		{
			return false;
		}


		return true;
	},

	_hasFilter: function(){
		if(this.state.typeFilter ||
			this.state.authorFilter || 
			this.state.dateFilter){
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
		this.setState({
			dateFilter: date
		});
	},

	render: function(){

		// var timeObj = moment(mood.date, "ddd MMM DD YYYY hh:mm:ss");
		// var date = timeObj.format("MM-DD-YYYY");

		var filteredEntries = this.props.entries.filter(function(entry){
			return this._inFilter(entry);

		}.bind(this));

		var entries = filteredEntries.map(function(entry){
			return <GeneralPanel key={entry.id} entry={entry} />;	
		}.bind(this));

		var filterMessages = [];
		if(this.state.typeFilter){
			filterMessages.push(<p key="type">Type: {this.state.typeFilter.capitalizeFirstLetter()} </p>);
		}
		if(this.state.authorFilter){
			filterMessages.push(<p key="author">Author: {this.state.authorFilter.capitalizeFirstLetter()}</p>);
		}

		var filterButton = null;
		if(this._hasFilter()){
			filterButton = (<Button bsStyle='primary' key="btn" onClick={this._cancelFilter}>Cancel Filter</Button>);
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
				<DatePicker
					key="date"
					selected={this.state.dateFilter}
					onChange={this.selectDate}
					placeholderText="Date Filter"
				/>
				{filterButton}
				{entries} 

			</div>
			);
	}

});

module.exports = PanelList;