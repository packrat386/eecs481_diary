var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var ServerRequests = require('../utils/ServerRequests');
var Authentication = require('../utils/Authentication');

var Logout = React.createClass({
	mixins: [Router.Navigation],

	componentDidMount: function(){
		console.log("log me out");
		DiaryActions.clearStores();
		ServerRequests.logout();

		this.transitionTo("/");
	},

	render: function(){
		console.log("render logout");
		return (
			<div className="container">
				<p> You have logged out! </p>
			</div>
		);
	}
});

module.exports = Logout;