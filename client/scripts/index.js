var React = require('react'),
	Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var CurrentUserStore = require('../stores/CurrentUserStore');

var Header = React.createClass({
	componentDidMount: function() {
		CurrentUserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CurrentUserStore.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState({});
	},

	render: function() {

		var user_header = null;
		if(ServerRequests.loggedIn()){
			console.log(ServerRequests.currentUser()); 
			user_header = (
				<p>Logged in as <b>{ServerRequests.currentUser().attributes.username}</b></p>
			);
		}

		return (
			<div className="page-header">
				<h1>ICU Diary</h1>
				{user_header}
			</div>
		);
	}
});

var PageNav = React.createClass({
	render: function() {
		var extra_nav = []
		if(!ServerRequests.loggedIn()){
			extra_nav.push(<li role="presentation"> <Router.Link to="login">Login/Create Account</Router.Link> </li>);
		} else {
			extra_nav.push(<li role="presentation"> <Router.Link to="main">View Entries</Router.Link> </li>);
			extra_nav.push(<li role="presentation"> <Router.Link to="add">Write a New Entry</Router.Link> </li>);
			extra_nav.push(<li role="presentation"> <Router.Link to="logout">Logout</Router.Link> </li>);

		}
		return (
			<ul className="nav nav-pills">
				<li role="presentation">
					<Router.Link to="home">Home</Router.Link>
				</li>
				<li role="presentation">
					<Router.Link to="about">About</Router.Link>
				</li>
				{extra_nav}
			</ul>
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
	Main: require('../routes/Main'),
	NotFound: require('../routes/NotFound'),
	AddEntry: require('../routes/AddEntry')
};

var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="login" path="/login" handler={routes.Login}/>
		<Router.Route name="logout" path="/logout" handler={routes.Logout}/>
		<Router.Route name="main" path="/main" handler={routes.Main}/>
		<Router.Route name="add" path="/add" handler={routes.AddEntry}/>
		<Router.DefaultRoute handler={routes.Home}/>
		<Router.NotFoundRoute handler={routes.NotFound}/>
	</Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
