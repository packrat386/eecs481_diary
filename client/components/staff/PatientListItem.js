var React = require('react');
var CaseStore = require('../../stores/CaseStore');
var SettingsActions = require('../../actions/SettingsActions');
var StaffActions = require('../../actions/StaffActions');


var PatientListItem =  React.createClass({

	_onClick: function(event){
		event.preventDefault();
		StaffActions.selectPatient(this.props.patient);
	},

	render: function(){

		var classString = "list-group-item";
		if(CaseStore.isActive(this.props.patient)){
			classString += " active";
		}

		return (
			<a href="#" className={classString} onClick={this._onClick}>
				{this.props.patient.attributes.username} ({this.props.patient.id})
			</a>
		);
	}

});

module.exports = PatientListItem;
