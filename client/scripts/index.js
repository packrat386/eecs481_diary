var React = require('react'),
	Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');

var Header = React.createClass({
	render: function() {
		return (
			<div className="page-header">
				<h1>eecs481_diary</h1>
			</div>
		);
	}
});

var PageNav = React.createClass({
	render: function() {
		var extra_nav;
		if(!ServerRequests.loggedIn()){
			extra_nav = <Router.Link to="login">Login/Create Account</Router.Link>;
		} else {
			extra_nav = (<span>
							<Router.Link to="main">Main</Router.Link>
							&nbsp; | &nbsp; 
						 	<Router.Link to="logout">Logout</Router.Link>
						 </span>);
		}
		return (
			<div className="nav">
				<Router.Link to="home">Home</Router.Link>
				&nbsp; | &nbsp;
				<Router.Link to="about">About</Router.Link>
				&nbsp; | &nbsp;
				{extra_nav}
			</div>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Header />
				<PageNav />
				<Router.RouteHandler/>
			</div>
		);
	}
});

var routes = {
	Home: require('../routes/Home'),
	About: require('../routes/About'),
	Login: require('../routes/Login'),
	Logout: require('../routes/Logout'),
	Main: require('../routes/Main')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="login" path="/login" handler={routes.Login}/>
		<Router.Route name="logout" path="/logout" handler={routes.Logout}/>
		<Router.Route name="main" path="/main" handler={routes.Main}/>
		<Router.DefaultRoute handler={routes.Home}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});