var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../../actions/DiaryActions');
var _ = require('underscore');
var TextInput = require('../Input/TextInput');

var CaseStore = require('../../stores/CaseStore');
var SettingsActions = require('../../actions/SettingsActions');


var AddEntryVisitor = React.createClass({
	mixins: [Router.Navigation],

	getInitialState: function(){
		return {
			data: null,
			callbackList: [],
			patientList: null,
			shareWith: {}
		}
	},

	componentDidMount: function() {
		CaseStore.addChangeListener(this._onChange);

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
		for(key in this.state.shareWith){
			if(this.state.shareWith[key]){
				shareArray.push(key);
			}
		}

		var dataObj = this.state.data;
		//Go through each callback and merge with data
		for(var i = 0; i < this.state.callbackList.length; i++){
			dataObj = _.extend({}, dataObj, this.state.callbackList[i]());
		}


		DiaryActions.addEntry({
			ACL: shareArray,
			data: dataObj.data
		}, function(response){
			if(response){
				this.transitionTo('main');
			}
		}.bind(this));
	},

	_onShareClick: function(event){
		event.preventDefault();
		console.log(event.target);
		var tempShare = this.state.shareWith;
		if(!tempShare[event.target.value]){
			tempShare[event.target.value] = true;
		} else {
			delete tempShare[event.target.value];
		}

		this.setState({
			shareWith: tempShare
		});
	},

	render: function(){

		var shareWith = null;
		if(this.state.patientList){

				shareWith = this.state.patientList.map(function(patientRef){
					
					var className = "list-group-item";
					if(this.state.shareWith[patientRef.id]){
						className += " active";
					}
					return (
						<button className={className}
							key={patientRef.id} 
							onClick={this._onShareClick} 
							value={patientRef.id}
							ref={patientRef.id}>
							
							{patientRef.id}
						</button>
						);
				}.bind(this));
		}

		return (
			<span>
				<h3>Add Diary Entry</h3> 
				<p><b>Share with</b></p>
				{shareWith}
				<TextInput registerCallback={this.addToCallbackList}/>
				<button className="btn btn-lg btn-primary" onClick={this._submitEntry}>Submit</button>
			</span>
		);
	}
});

module.exports = AddEntryVisitor;