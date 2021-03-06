var React = require('react'),
	Router = require('react-router');
var ServerRequests = require('../utils/ServerRequests');
var CurrentUserStore = require('../stores/CurrentUserStore');
var _ = require('underscore');

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
			var user_type = null;
			if(CurrentUserStore.getUser().get("user_type")){
				user_type = CurrentUserStore.getUser().get("user_type").capitalizeFirstLetter();
			}
			user_header = (
				<p>Logged in as <b>{CurrentUserStore.getUser().attributes.username}</b> ({user_type})</p>
			);
		}

		return (
			<div className="page-header text-center" id="header">
				<h1>ICU Diary</h1>
				{user_header}
			</div>
		);
	}
});

var PageNav = React.createClass({
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
		var extra_nav = [];
		if(!ServerRequests.loggedIn()){
			extra_nav.push(
					<li role="presentation" key="home" >
						<Router.Link to="home">
						<div><span className="glyphicon glyphicon-home" aria-hidden="true"></span></div>
							Home</Router.Link>
					</li>);
			extra_nav.push(
					<li role="presentation" key="about">
						<Router.Link to="about">
						<div><span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span></div>
						About</Router.Link>
					</li>);
			extra_nav.push(<li role="presentation" key="login"> 
							<Router.Link to="login">
								<div><span className="glyphicon glyphicon-log-in" aria-hidden="true"></span></div>
								Login/Create Account
							</Router.Link> </li>);
		} else {
			extra_nav.push(<li role="presentation" key="main" width="90"> 
							<Router.Link to="main">
									<div><span className="glyphicon glyphicon-calendar" aria-hidden="true"></span></div>
							Old Entries
							</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="list"> 
								<Router.Link to="list">
									<div><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span></div>
									List
								</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="add">
							 <Router.Link to="add">
							 <div><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
							 	New Entry
							 </Router.Link> </li>);

			//Only add graphs for patients
			if(CurrentUserStore.getUser() && CurrentUserStore.getUser().get("user_type") === "patient"){
				extra_nav.push(<li role="presentation" key="graphs">
								 <Router.Link to="graphs">
								 <div><span className="glyphicon glyphicon-signal" aria-hidden="true"></span></div>
								 	Graphs
								 </Router.Link> </li>);				
			}

			extra_nav.push(<li role="presentation" key="settings"> 
							<Router.Link to="settings">
								<div><span className="glyphicon glyphicon-wrench" aria-hidden="true"></span></div>
								Settings
							</Router.Link> </li>);
			extra_nav.push(<li role="presentation" key="logout"> 
								<Router.Link to="logout">
									<div><span className="glyphicon glyphicon-log-out" aria-hidden="true"></span></div>
									Logout
								</Router.Link>
							</li>);

		}
		return (
			<div>
				<ul className="nav nav-pills nav-justified" id="nav-bar">
					{extra_nav}
				</ul>
			</div>
		);
	}
});

//Utility method, should probably be moved to another utils class
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

_.deepObjectExtend = function(target, source) {
    for (var prop in source)
        if (prop in target)
            _.deepObjectExtend(target[prop], source[prop]);
        else
            target[prop] = source[prop];
    return target;
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
	Settings: require('../routes/Settings'),
	List: require('../routes/List'),
	Item: require('../routes/Item'),
	Graphs: require('../routes/Graphs')
};



var routes = (
	<Router.Route name="app" path="/" handler={App}>
		<Router.Route name="home" path="/" handler={routes.Home}/>
		<Router.Route name="about" path="/about" handler={routes.About}/>
		<Router.Route name="login" path="/login" handler={routes.Login}/>
		<Router.Route name="logout" path="/logout" handler={routes.Logout}/>
		<Router.Route name="main" path="/main" handler={routes.Main}/>
		<Router.Route name="settings" path="/settings" handler={routes.Settings}/>
		<Router.Route name="list" path="/list" handler={routes.List}/>
		<Router.Route name="add" path="/add" handler={routes.AddEntry}/>
		<Router.Route name="graphs" path="/graphs" handler={routes.Graphs}/>
		<Router.Route name="item" path="/item/:itemId" handler={routes.Item}/>
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
