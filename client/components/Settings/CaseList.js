var React = require('react');
var Parse = require('../../utils/ParseInit');
var CaseListItem = require('./CaseListItem');
var CaseStore = require('../../stores/CaseStore');
var CurrentUserStore = require('../../stores/CurrentUserStore');
var SettingsActions = require('../../actions/SettingsActions');


var CaseList =  React.createClass({
	getInitialState: function(){
		return {
			caseList: CaseStore.getCases(),
			message: null
		};
	},

	componentDidMount: function() {
		CaseStore.addChangeListener(this._onChange);
		CaseStore.addChangeListener(this._onCurrentUserChange);

		SettingsActions.updatePatients(function(response){
			if(response){
				this.setState({
					caseList: response
				});
			}
		}.bind(this));
	},

	componentWillUnmount: function() {
		CaseStore.removeChangeListener(this._onChange);
		CaseStore.removeChangeListener(this._onCurrentUserChange);
	},

	_onCurrentUserChange: function(){
		// SettingsActions.updatePatients(function(response){
		// 	if(response){
		// 		this.setState({
		// 			caseList: CaseStore.getCases()
		// 		});
		// 	}
		// });
	},

	_onChange: function(){
		this.setState({
			caseList: CaseStore.getCases()
		});
	},

	_addPatient: function(){
		console.log(this.refs.new_patient.getDOMNode().value);
		if(this.refs.new_patient.getDOMNode().value == ""){
			this.setState({
				message:
					{
						className: "alert alert-danger",
						message: "Can't add blank patient!"
					}
			})
			return;
		}
		console.log("Add patient action");
		SettingsActions.addPatient(this.refs.new_patient.getDOMNode().value, function(response){

			if(response instanceof Parse.Error){
				return this.setState({
					message:
						{
							className: "alert alert-danger",
							message: response.message
						}
				});
			} else {
				console.log("Added");
				this.refs.new_patient.getDOMNode().value = "";
			}


		}.bind(this));
	},

	_newPatient: function(event){
		event.preventDefault();
		this._disableButtonWrapper(this._addPatient);
	},

	_disableButtonWrapper: function(func){
		this._disableButtons();
		func();
		this._enableButtons();
	},

	_deleteSelected: function(event){
		event.preventDefault();
		SettingsActions.deletePatients();

	},

	_disableButtons: function(){
		$(this.refs.button_add.getDOMNode()).prop('disabled', true);
		$(this.refs.button_delete.getDOMNode()).prop('disabled', true);
	},

	_enableButtons: function(){
		$(this.refs.button_add.getDOMNode()).prop('disabled', false);
		$(this.refs.button_delete.getDOMNode()).prop('disabled', false);
	},

	render: function(){
		//Pass down each patient into the CaseListItem
		var CaseListItems = this.state.caseList.map(function(patientRef){
					var patientInfo = patientRef;
					return (<CaseListItem patient={patientInfo} key={patientInfo.id}/>);
				});

		//Display message if it exists
		var messageComponent = null;
		if(this.state.message){
			messageComponent =
				(<div className={this.state.message.className}>
					{this.state.message.message}
				</div>);
		}

		var zeroSelected = CaseStore.numCases() === 0 ? true : false;

		return (
			<span>
				{messageComponent}
				<div className="list-group" style={{display: "table"}}>
					{CaseListItems}
					<form onSubmit={this._newPatient}>
						<input ref="new_patient" placeholder="New Patient ID" className="list-group-item" />
					</form>
				</div>
				<button className="btn btn-lg btn-primary" ref="button_add" onClick={this._newPatient}>Add Patient</button><br/>
				<button className="btn btn-lg btn-danger" ref="button_delete" onClick={this._deleteSelected} disabled={zeroSelected}>Delete Selected Patients</button>
			</span>
		);
	}

});

module.exports = CaseList;
