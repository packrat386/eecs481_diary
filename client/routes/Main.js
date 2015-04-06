var React = require('react');
var Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');
var CurrentUserStore = require('../stores/CurrentUserStore');

var PatientList = require('../components/staff/PatientList');
var ListView = require('../components/ListView');
var PatientEntryList = require('../components/staff/PatientEntryList');

var Main = React.createClass({
	mixins: [Authentication],

	componentDidMount: function(){
		document.title = "ICU Diary | View All";
	},

	render: function(){
		var component = <ListView />;
		if(CurrentUserStore.getUser().attributes.user_type === "staff"){
			component =
				<span>
					<h3>Patient List</h3>
					<PatientList />
					<PatientEntryList />
				</span>;
		} else if(CurrentUserStore.getUser().attributes.user_type === "visitor"){
			component =
				<span>
					<h3>Patients Following</h3>
					<PatientList />
					<hr className="col-md-12"/>
				</span>;
		}
		return (
			<div className="container">
				{component}
			</div>
		);
	}
});

module.exports = Main;
