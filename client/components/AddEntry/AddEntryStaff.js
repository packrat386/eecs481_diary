var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../../actions/DiaryActions');
var _ = require('underscore');
var moment = require('moment');

var TextInput = require('../Input/TextInput');
var VisitorList = require('../Input/VisitorList');
var TakeImage = require('./TakeImage');

var CaseStore = require('../../stores/CaseStore');
var SettingsActions = require('../../actions/SettingsActions');
var CurrentUserStore = require('../../stores/CurrentUserStore');
var PatientList = require('../staff/PatientList');


var AddEntryStaff = React.createClass({
	mixins: [Router.Navigation],

	getInitialState: function(){
		return {
			data: null,
			callbackList: [],
			patientList: null,
			shareWith: {},
			type: "text"
		}
	},

	componentDidMount: function() {
		CaseStore.addChangeListener(this._onChange);
		if(this.props.registerCallback){
			this.props.registerCallback(this._getData);
		}

		SettingsActions.updatePatients(function(response){
			if(response){
				this.setState({
					patientList: response
				});
			}
		}.bind(this));
	},

	componentWillUnmount: function() {
		CaseStore.removeChangeListener(this._onChange);
	},

	_getData: function(){
		var shareArray = [];
		var selectedPatient = CaseStore.getCase(CaseStore.getLastSelected());
		shareArray.push(CurrentUserStore.getUser().id);

		if(!selectedPatient){
			alert('No selected patient');
			return null;
		}

		shareArray.push(selectedPatient.id);		

		var dataObj = this.state.data;
		var emptyDataObj = {data:{}};
		emptyDataObj.data = _.extend(emptyDataObj.data, dataObj);
		//Go through each callback and merge with data
		for(var i = 0; i < this.state.callbackList.length; i++){
			var returnedObj = this.state.callbackList[i]();
			emptyDataObj.data = _.extend(emptyDataObj.data, returnedObj.data);
		}
		var returnObj = _.extend(emptyDataObj, {ACL: shareArray});
		console.log(returnObj);
		return (returnObj);
	},

	_onChange: function(){
		this.setState({
			patientList: CaseStore.getCases()
		});
	},

	addToCallbackList: function(response){
		var currentList = this.state.callbackList;
		currentList.push(response);
		this.setState({
			callbackList: currentList
		});
	},

	_submitEntry: function(){
		// event.preventDefault();

		var shareArray = [];
		var selectedPatient = CaseStore.getCase(CaseStore.getLastSelected());
		shareArray.push(CurrentUserStore.getUser().id);
		shareArray.push(selectedPatient.id);

		var dataObj = this.state.data;
		//Go through each callback and merge with data
		for(var i = 0; i < this.state.callbackList.length; i++){
			if (!this.state.callbackList[i]()){
				console.log('yo');
				return;
			}
			dataObj = _.extend({}, dataObj, this.state.callbackList[i]());
		}

		DiaryActions.addEntry({
			ACL: shareArray,
			type: this.state.type,
			data: dataObj.data
		}, function(response){
			if(response){
				this.transitionTo('main');
			}
		}.bind(this));
	},

	_uploadPicture: function(event){

	},

	render: function(){

		var text = "Add Post";
		var visitorList = null;

		var selectedPatientID = CaseStore.getLastSelected();
		var selectedPatient = null;
		if (selectedPatientID){
			selectedPatient = CaseStore.getCase(selectedPatientID);
			text += ": " + selectedPatient.attributes.username;
		}
		if(CurrentUserStore.getUser().get("user_type") === "patient"){
			text = "Who's there?";
			visitorList = (<VisitorList registerCallback={this.addToCallbackList}/>);
		}

		var initialTitle = "Staff Entry by " + CurrentUserStore.getUser().attributes.username + " on " + moment().format("MM-DD-YYYY");

		var photoButtonStyle = {
			paddingTop: '10px',
			paddingLeft: '15px'
		};
		return (
			<div className="container">
				<div className="row">
				<PatientList />
				</div>
				<div className ="entry col-xs-12 col-sm-12 col-md-8">
					<span>
						<h3>{text}</h3>
						<div className="row">
							<TextInput registerCallback={this.addToCallbackList} initialTitle={initialTitle}/>
						</div>
					</span>
				</div>
			</div>

		);
	}
});

module.exports = AddEntryStaff;
