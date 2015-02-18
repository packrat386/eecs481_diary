React = require('react');

var Login = React.createClass({
	// mixins: [Router.Navigation],

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
		var username = this.refs.email.getDOMNode().value;
		var password = this.refs.pass.getDOMNode().value;
		console.log("handleLogin: " + username + " " + password);
	},

	handleSignup: function(event){
		event.preventDefault();
		var username = this.refs.email1.getDOMNode().value;
		var password = this.refs.pass1.getDOMNode().value;
		console.log("handleSignup: " + username + " " + password);
	},

	render: function(){
		// var errors = this.state.error ? <p>Request Error</p> : '';
		// if(ParseActions.loggedIn()){
		// 	this.transitionTo('/');
		// }

		// console.log(ParseActions.currentUser());
		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";
		return (

			<div className="container">
				<h2>Sign-In</h2>
				{this.state.signinMessage}
				<form onSubmit={this.handleLogin}>
			        <label><input className={input_className} ref="email" placeholder="email"/></label>
			        <label><input className={input_className}  ref="pass" placeholder="password"/></label><br/>
			        <button className={button_className} type="submit">Login</button>
				</form>
				<h2>Create Account</h2>
				{this.state.signupMessage}
				<form onSubmit={this.handleSignup}>
			        <label><input className={input_className} ref="email1" placeholder="email"/></label>
			        <label><input className={input_className} ref="pass1" placeholder="password"/></label><br/>
			        <button className={button_className} type="submit">Create Account</button>
				</form>

			</div>
		);
	}


});

module.exports = Login;