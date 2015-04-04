var React = require('react');
var CaseStore = require('../../stores/CaseStore');
var SettingsActions = require('../../actions/SettingsActions');

var CaseListItem =  React.createClass({

	_onClick: function(event){
		event.preventDefault();
		SettingsActions.toggleActive(this.props.patient);
	},

	// componentDidMount: function() {
	// 	CaseStore.addChangeListener(this._onChange);
	// },

	// componentWillUnmount: function() {
	// 	CaseStore.removeChangeListener(this._onChange);
	// },

	// _onChange: function(){
	// 	this.setState({});
	// },

	render: function(){

		var classString = "list-group-item";
		if(CaseStore.isActive(this.props.patient)){
			classString += " active";
		}

		return (
			<a href="#" className={classString} onClick={this._onClick}>
				{this.props.patient.id}
			</a>
		);
	}

});

module.exports = CaseListItem;