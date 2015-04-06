var React = require('react');
var GeneralPanel = require('./PanelViews/GeneralPanel');

var types = ["text", "doodle", "visit", "mood"];

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Button = require('react-bootstrap').Button;

var PanelList =  React.createClass({

	getInitialState: function(){
		return {
			typeFilter: null
		}
	},

	_testClick: function(selectedKey){
		console.log(selectedKey);
		this.setState({
			typeFilter: selectedKey
		});
	},

	_cancelFilter: function(){
		this.setState({
			typeFilter: null
		});
	},

	render: function(){

		var entries = this.props.entries.map(function(entry){
			if(!this.state.typeFilter || (this.state.typeFilter && this.state.typeFilter === entry.get("type")))
			{
				return <GeneralPanel key={entry.id} entry={entry} />;	
			}

		}.bind(this));

		var filterMessage = null;
		if(this.state.typeFilter){
			filterMessage = (
				<span>
					<p>Type: {this.state.typeFilter.capitalizeFirstLetter()} </p>
					<Button bsStyle='default lg' onClick={this._cancelFilter}>Cancel Filter</Button>
				</span>
			);
		}

		var dropdowns = types.map(function(item){
			return <MenuItem eventKey={item} key={item}>{item.capitalizeFirstLetter()}</MenuItem>
		});

		return (
			<div>
	
				<DropdownButton title='Filter By' onSelect={this._testClick}>
				{dropdowns}
				</DropdownButton>
				{filterMessage}
				{entries} 
			</div>
			);
	}

});

module.exports = PanelList;