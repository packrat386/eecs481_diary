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


var AddEntryVisitor = React.createClass({

	getInitialState: function(){
		return {
			data: null,
			callbackList: [],
			patientList: null,
			shareWith: {},
			type: "visit"
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
		for(key in this.state.shareWith){
			if(this.state.shareWith[key]){
				shareArray.push(key);
			}
		}

		var dataObj = this.state.data;
		//Go through each callback and merge with data
		for(var i = 0; i < this.state.callbackList.length; i++){
			console.log(this.state.callbackList[i]());
			dataObj = $.extend(true, {}, dataObj, this.state.callbackList[i]());
		}


		console.log(dataObj);
		return (_.extend({}, {ACL: shareArray, type: this.state.type}, dataObj));
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
			type: this.state.type,
			data: dataObj.data
		}, function(response){
			if(response){
				this.transitionTo('list');
			}
		}.bind(this));
	},

	_onShareClick: function(event){
		event.preventDefault();
		console.log($(event.currentTarget).attr("value"));

		var id = $(event.currentTarget).attr("value");
		// $(event.target).toggleClass("active");
		if(id){
			var tempShare = this.state.shareWith;
			if(!tempShare[id]){
				tempShare[id] = true;
			} else {
				delete tempShare[id];
			}

			this.setState({
				shareWith: tempShare
			});
		}

	},

	render: function(){

		var shareWith = null;
		if(this.state.patientList){

				shareWithInner = this.state.patientList.map(function(patientRef){
					
					var className = "list-group-item";
					if(this.state.shareWith[patientRef.id]){
						className += " active";
					}
					return (
						<a className={className}
							key={patientRef.id} 
							onClick={this._onShareClick} 
							value={patientRef.id}
							ref={patientRef.id}
							>
							
							{patientRef.getUsername()} ({patientRef.id})
						</a>
						);
				}.bind(this));

				shareWith = <div className="list-group" style={{display: "table"}}>
				{shareWithInner}
				</div>;
		}

		var text = "Share with";
		var visitorList = null;
		if(CurrentUserStore.getUser().get("user_type") === "patient"){
			text = "Who's there?";
		} 
		visitorList = (<VisitorList registerCallback={this.addToCallbackList}/>);

		var initialTitle = "Visit on " + moment().format("MM-DD-YYYY");

		return (
			<span>
				<h3>Add Post</h3> 
				<p><b>{text}</b></p>
				<div className="row">
					{shareWith}
				</div>
				<div className="row">
					{visitorList}
				</div>
				<TextInput registerCallback={this.addToCallbackList} initialTitle={initialTitle}/>
				<TakeImage registerCallback={this.addToCallbackList}/>
			</span>
		);
	}
});

module.exports = AddEntryVisitor;