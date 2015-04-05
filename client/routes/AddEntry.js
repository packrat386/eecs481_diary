var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var AddBasicEntry = require('../components/AddBasicEntry');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');
var AddEntryVisitor = require('../components/AddEntry/AddEntryVisitor');

function getEntryTypes() {
	return [
		{name: "Text", icon: "glyphicon glyphicon-pencil", type: "text", path: "addText"},
		{name: "Doodle", icon: "glyphicon glyphicon-picture", type: "doodle", path: "addDoodle"},
		{name: "Mood", icon: "glyphicon glyphicon-heart", type: "slider", path: "addMood"},
		{name: "Visit", icon: "glyphicon glyphicon-user", type: "visit", path: "addVisit"}
	];
}

var AddEntry = React.createClass({
	mixins: [Authentication],

	componentDidMount: function(){
		document.title = "ICU Diary | Add";
	},

	getInitialState: function(){
		return { types: getEntryTypes() };
	},

	render: function(){
		var buttonStyle = {
			//paddingRight: 5
		};
		var containerStyle = {
			padding: 35
		};

		var entryTypes = null;

		if(CurrentUserStore.getUser().get("user_type") === "visitor"){
			entryTypes = <AddEntryVisitor />
		} else {
			entryTypes = this.state.types.map(function (entryType) {
				return (
					<div className="col-md-3 col-sm-6 col-xs-12" key={entryType.name}>
						<Router.Link to={ entryType.path }>
							<button type="button" className="btn btn-square">
								<div className="btn-square-text">
								<div><span style={buttonStyle} className={entryType.icon} aria-hidden="true"></span></div>
								{ entryType.name }
									</div>
							</button>
						</Router.Link>
					</div>
				);
			});		
		}

		return (

			<div className="container" style={containerStyle}>
			{ entryTypes }
				<div className="row clearfix">
					<div className="col-md-12 column" >
						<h1> </h1>
						<h1 className="text-center"> Main Function Area </h1>
						<h1>  </h1>
						<h1>  </h1>
						<button type="button" className="btn btn-block btn-lg btn-primary">Done</button>
					</div>
				</div>


			</div>
		);
	}
});

module.exports = AddEntry;
