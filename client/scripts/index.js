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
		if(CurrentUserStore.getUser()){
			// console.log(ServerRequests.currentUser());
			user_header = (
				<p>Logged in as <b>{CurrentUserStore.getUser().attributes.username}</b></p>
			);
		}

		return (
			<div className="page-header" id="header">
				<h1>ICU Diary</h1>
				{user_header}
			</div>
		);
	}
});

var PageNav = React.createClass({
	render: function() {
		var extra_nav = [];
		if(!ServerRequests.loggedIn()){
			extra_nav.push(<li role="presentation" key="login"> <Router.Link to="login">Login/Create Account</Router.Link> </li>);
		} else {
			extra_nav.push(<li role="presentation" key="main"> <Router.Link to="main">View Entries</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="add"> <Router.Link to="add">Write a New Entry</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="settings"> <Router.Link to="settings">Settings</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="logout"> <Router.Link to="logout">Logout</Router.Link> </li>);

		}
		return (
			<ul className="nav nav-pills" id="nav-bar">
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

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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
	AddEntry: require('../routes/AddEntry'),
	AddBasicEntry: require('../routes/AddBasicEntry'),
	AddDoodleEntry: require('../routes/AddDoodleEntry'),
	AddMoodEntry: require('../routes/AddMoodEntry'),
	AddVisitEntry: require('../routes/AddVisitEntry'),
	Settings: require('../routes/Settings')
};



var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="login" path="/login" handler={routes.Login}/>
		<Router.Route name="logout" path="/logout" handler={routes.Logout}/>
		<Router.Route name="main" path="/main" handler={routes.Main}/>
		<Router.Route name="settings" path="/settings" handler={routes.Settings}/>

		<Router.Route name="add" path="/add" handler={routes.AddEntry}/>
		<Router.Route name="addText" path="/add/text" handler={routes.AddBasicEntry}/>
		<Router.Route name="addDoodle" path="/add/doodle" handler={routes.AddDoodleEntry}/>
		<Router.Route name="addMood" path="/add/mood" handler={routes.AddMoodEntry}/>
		<Router.Route name="addVisit" path="/add/visit" handler={routes.AddVisitEntry}/>
		<Router.DefaultRoute handler={routes.Home}/>
		<Router.NotFoundRoute handler={routes.NotFound}/>
	</Router.Route>
);

if(ServerRequests.loggedIn()){
	//Set the initial current user inside the CurrentUserStore
	CurrentUserStore.setUser(ServerRequests.currentUser());
}

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
