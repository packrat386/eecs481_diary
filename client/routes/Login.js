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
	},

	handleSignup: function(event){
		event.preventDefault();
		var username = this.refs.email1.getDOMNode().value;
		var password = this.refs.pass1.getDOMNode().value;
	},

	render: function(){
		// var errors = this.state.error ? <p>Request Error</p> : '';
		// if(ParseActions.loggedIn()){
		// 	this.transitionTo('/');
		// }

		// console.log(ParseActions.currentUser());

		return (
			<div>
				<h1>Sign-In </h1>
				{this.state.signinMessage}
				<form onSubmit={this.handleLogin}>
			        <label><input ref="email" placeholder="email"/></label>
			        <label><input ref="pass" placeholder="password"/></label><br/>
			        <button type="submit">Login</button>
				</form>
				<h1>Create Account </h1>
				{this.state.signupMessage}
				<form onSubmit={this.handleSignup}>
			        <label><input ref="email1" placeholder="email"/></label>
			        <label><input ref="pass1" placeholder="password"/></label><br/>
			        <button type="submit">Create Account</button>
				</form>

			</div>
		);
	}


});

module.exports = Login;