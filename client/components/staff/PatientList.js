var React = require('react');
var Parse = require('../../utils/ParseInit');
var CaseListItem = require('../Settings/CaseListItem');
var PatientListItem = require('../staff/PatientListItem');
var CaseStore = require('../../stores/CaseStore');
var CurrentUserStore = require('../../stores/CurrentUserStore');
var SettingsActions = require('../../actions/SettingsActions');
var PatientEntryList = require('../staff/PatientEntryList');

var PatientList =  React.createClass({
	getInitialState: function(){
		return {
			caseList: CaseStore.getCases(),
			message: null,
			searchString: ''
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
	handleSearchChange: function(e){
		// If you comment out this line, the text box will not change its value.
		// This is because in React, an input cannot change independently of the value
		// that was assigned to it. In our case this is this.state.searchString.
		this.setState({searchString:e.target.value});
	},

	_onChange: function(){
		this.setState({
			caseList: CaseStore.getCases()
		});
	},

	render: function(){

		var listItems = this.state.caseList;
		var searchString = this.state.searchString.trim().toLowerCase();
		if(searchString.length > 0){
			// We are searching. Filter the results.
			listItems = listItems.filter(function(item){
				var itemData = item.cid + " " + item.id + " " + item.attributes.username;
				return itemData.toLowerCase().match( searchString );
			});
		}

		//Pass down each patient into the CaseListItem
		var CaseListItems = listItems.map(function(patientRef){
			var patientInfo = patientRef;
			return (<PatientListItem patient={patientInfo} key={patientInfo.id}/>);
		});

		//Display message if it exists
		var messageComponent = null;
		if(this.state.message){
			messageComponent =
				(<div className={this.state.message.className}>
					{this.state.message.message}
				</div>);
		}

		//var zeroSelected = CaseStore.numCases() === 0 ? true : false;

		return (
			<span>
				{messageComponent}
					<div className="list-group col-xs-12 col-sm-12 col-md-4" style={{display: "table"}}>
						<form className="form">
							<div className="form-group">
								<input type="text" className="form-control" value={this.state.searchString} onChange={this.handleSearchChange} placeholder="Type here to filter patients" />
								{CaseListItems}
							</div>

						</form>
					</div>
			</span>
		);
	}

});


module.exports = PatientList;
