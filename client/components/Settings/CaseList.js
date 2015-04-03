var React = require('react');
var CaseListItem = require('./CaseListItem');
var CaseStore = require('../../stores/CaseStore');
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
	},

	componentWillUnmount: function() {
		CaseStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({
			caseList: CaseStore.getCases()
		});
	},

	_newPatient: function(event){
		event.preventDefault();
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
		SettingsActions.addPatient(this.refs.new_patient.getDOMNode().value);
		//Need to add callback for this to actually work LOL
		this.refs.new_patient.getDOMNode().value = "";
	},

	_deleteSelected: function(event){
		event.preventDefault();
		SettingsActions.deletePatients();

	},

	render: function(){

		var CaseListItems = this.state.caseList.map(function(dataElement){
					return (<CaseListItem text={dataElement} key={dataElement}/>);
				});

		var messageComponent = null;
		if(this.state.message){
			messageComponent = 
				(<div className={this.state.message.className}>
					{this.state.message.message}
				</div>);
		}

		return (
			<span>
				<h3>Patient List</h3>
				{messageComponent}
				<div className="list-group">
					{CaseListItems}
					<input ref="new_patient" placeholder="New Patient ID" className="list-group-item" />
					
				</div>
				<button className="btn btn-lg btn-primary" onClick={this._newPatient}>Add Patient</button><br/>
				<button className="btn btn-lg btn-danger" onClick={this._deleteSelected}>Delete Selected Patients</button>
			</span>
		);
	}

});

module.exports = CaseList;