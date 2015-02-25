var React = require('react');
var Router = require('react-router');

var Home = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
			  <h1>EECS 481 ICU Diary</h1>
			  <p> Create, edit, and view diary entries! </p>
			  <p> <Router.Link className="btn btn-primary btn-lg" to="main">Try it out</Router.Link> </p>
			</div>
		);
	}
});

module.exports = Home;
