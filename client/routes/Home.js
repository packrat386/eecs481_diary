var React = require('react');
var Router = require('react-router');

var Home = React.createClass({
	componentDidMount: function(){
		document.title = "ICU Diary | Home";
	},

	render: function() {
		return (
			<div className="jumbotron">
			  <h1 className= "text-center">EECS 481 ICU Diary</h1>
			  <p className= "text-center"> Create, edit, and view diary entries! </p>
			  <p className= "text-center"> <Router.Link className="btn btn-primary btn-lg" to="main">View Your Posts </Router.Link> </p>
			</div>
		);
	}
});

module.exports = Home;
