var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddBasicEntry = require('../components/AddBasicEntry');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');

var AddEntryVisitor = require('../components/AddEntry/AddEntryVisitor');
var AddMoodEntry = require('../components/AddMoodEntry');
var AddBasicEntry = require('../components/AddBasicEntry');
var AddDoodleEntry = require('../components/AddDoodleEntry');

var DiaryActions = require('../actions/DiaryActions');

var _ = require('underscore');

function getEntryTypes() {
	return [
		{name: "Text", icon: "glyphicon glyphicon-pencil", type: "text", path: "addText"},
		{name: "Doodle", icon: "glyphicon glyphicon-picture", type: "doodle", path: "addDoodle"},
		{name: "Mood", icon: "glyphicon glyphicon-heart", type: "mood", path: "addMood"},
		{name: "Visit", icon: "glyphicon glyphicon-user", type: "visit", path: "addVisit"}
	];
}

function getTypeClasses(cb){
	return {
			"text": <AddBasicEntry registerCallback={cb}/>,
			"doodle": <AddDoodleEntry registerCallback={cb}/>,
			"mood": <AddMoodEntry registerCallback={cb}/>,
			"visit": <AddEntryVisitor registerCallback={cb}/>
	};
	
}

var AddEntry = React.createClass({
	mixins: [Authentication, Router.Navigation],

	componentDidMount: function(){
		document.title = "ICU Diary | Add";
	},

	_registerCallback: function(func){
		this.setState({
			getData: func
		});
	},

	getInitialState: function(){
		return { 
			types: getEntryTypes(),
			currentType: null,
			typeClass: getTypeClasses(this._registerCallback),
			getData: null
		};
	},

	_setType: function(event){
		event.preventDefault();

		this.setState({
			currentType: event.currentTarget.value
		});

		$("#main")[0].scrollIntoView();
	},

	_submitEntry: function(event){
		event.preventDefault();
		if(!this.state.getData || this.state.getData() === null){
			console.log("No callback registered");
			return;
		}

		var newEntry = _.extend({}, {type: this.state.currentType}, this.state.getData())
		DiaryActions.addEntry(newEntry, function(response){
			if(response){
				this.transitionTo('main');
			}
		}.bind(this));
	},

	render: function(){
		var buttonStyle = {
			//paddingRight: 5
		};
		var containerStyle = {
			paddingBottom: '12px'
		};

		var entryTypes = null;

		if(CurrentUserStore.getUser().get("user_type") === "visitor"){
			entryTypes = (<span>
				<AddEntryVisitor registerCallback={this._registerCallback}/>
				<button type="button" className="btn btn-block btn-lg btn-primary" onClick={this._submitEntry}>Done</button>
				</span>);
		} else {
			entryTypes = this.state.types.map(function (entryType) {
				return (
					<div className="col-md-3 col-sm-6 col-xs-12" key={entryType.name}>
						<button value={entryType.type} className="btn btn-square active" onClick={this._setType}>
							<div className="btn-square-text">
								<div><span style={buttonStyle} className={entryType.icon} aria-hidden="true"></span></div>
								{ entryType.name }
							</div>
						</button>
					</div>
				);
			}.bind(this));	
		}

		var mainView = null;
		if(this.state.currentType){
			console.log(this.state.currentType);
			mainView = 
				<span>
					<br />
					{this.state.typeClass[this.state.currentType]}
					<br />
					<button type="button" className="btn btn-block btn-lg btn-primary" onClick={this._submitEntry}>Done</button>
				</span>;
		}

		return (

			<div className="container">
				<div className="row">
					{ entryTypes }
				</div>

				<div className="row" ref="main" id="main">
					{mainView}
				</div>
			</div>
		);
	}
});

module.exports = AddEntry;