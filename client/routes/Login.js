var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var ServerRequests = require('../utils/ServerRequests');

var Login = React.createClass({
	mixins: [Router.Navigation],

	statics: {
		attemptedTransition: null
	},

	getInitialState: function() {
		return {
			signinMessage: '',
			signupMessage: ''
		};
	},

	handleLogin: function(event){
		event.preventDefault();
		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.pass.getDOMNode().value;
		console.log("handleLogin: " + username + " " + password);
	
		ServerRequests.login(username, password, function(loggedIn){
			console.log("handleLogin");
			if(!loggedIn){
				return this.setState({signinMessage:"Unable to log in"});
			}

			DiaryActions.clearStores();

			if(Login.attemptedTransition){
				var transition =  Login.attemptedTransition;
				Login.attemptedTransition = null;
				transition.retry();
			} else {
				this.transitionTo('/main');
			}
		}.bind(this));	
	},

	handleSignup: function(event){
		event.preventDefault();
		var username = this.refs.username1.getDOMNode().value;
		var password = this.refs.pass1.getDOMNode().value;
		console.log("handleSignup: " + username + " " + password);

		ServerRequests.createUser(username, password, function(createdAccount){
			if(createdAccount){
				DiaryActions.clearStores();
				return this.setState({signupMessage: "Created Account Successfully"});
			} else {
				return this.setState({signupMessage:"Failed to Created Account"});
			}
		}.bind(this));
	},

	render: function(){
		// var errors = this.state.error ? <p>Request Error</p> : '';
		if(ServerRequests.loggedIn()){
			this.transitionTo('/main');
		}

		// console.log(ParseActions.currentUser());
		

		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";
		return (
			<div className="container">
				<h2>Sign-In</h2>
				{this.state.signinMessage}
				<form onSubmit={this.handleLogin}>
			        <label><input className={input_className} ref="username" placeholder="Username"/></label>
			        <label><input className={input_className}  ref="pass" placeholder="Password"/></label><br/>
			        <button className={button_className} type="submit">Login</button>
				</form>
				<h2>Create Account</h2>
				{this.state.signupMessage}
				<form onSubmit={this.handleSignup}>
			        <label><input className={input_className} ref="username1" placeholder="Username"/></label>
			        <label><input className={input_className} ref="pass1" placeholder="Password"/></label><br/>
			        <button className={button_className} type="submit">Create Account</button>
				</form>

			</div>
		);
	}


});

module.exports = Login;