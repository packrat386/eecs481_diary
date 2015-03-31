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
			signinMessage: null,
			signupMessage: null
		};
	},

	componentDidMount: function(){
		document.title = "ICU Diary | Login";
	},

	handleLogin: function(event){
		event.preventDefault();
		var username = this.refs.username.getDOMNode().value;
		var password = this.refs.pass.getDOMNode().value;
		console.log("handleLogin: " + username + " " + password);
	
		DiaryActions.login({
			username: username,
			password: password
		}, function(response){
			if(response){	
				DiaryActions.clearStores();
				if(Login.attemptedTransition){
					var transition =  Login.attemptedTransition;
					Login.attemptedTransition = null;
					transition.retry();
				} else {
					this.transitionTo('/main');
				}
			}
		}.bind(this));
	},

	handleSignup: function(event){
		event.preventDefault();
		var username = this.refs.username1.getDOMNode().value;
		var password = this.refs.pass1.getDOMNode().value;
		var user_type = $("input:radio:checked").val();
		console.log($("input:radio:checked").val());

		if(!user_type){
			this.setState({signupMessage: "Pick a user type!"});
			return;
		}
		console.log("handleSignup: " + username + " " + password);

		ServerRequests.createUser(username, password, function(createdAccount){
			if(createdAccount){
				DiaryActions.clearStores();
				this.transitionTo('/main');
				// return this.setState({signupMessage: "Created Account Successfully"});
			} else {
				// return this.setState({signupMessage:"Failed to Created Account"});
			}
		}.bind(this));
	},

	render: function(){
		// var errors = this.state.error ? <p>Request Error</p> : '';
		if(ServerRequests.loggedIn()){
			this.transitionTo('/main');
		}

		// console.log(ParseActions.currentUser());
		signupComponent = null;
		signinComponent = null;

		if(this.state.signupMessage){
			signupComponent = 
				<div className="alert alert-danger">
					{this.state.signupMessage}
				</div>;
		}

		if(this.state.signinMessage){
			signinComponent = 
				<div className="alert alert-danger">
					{this.state.signinMessage}
				</div>;
		}

		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";
		return (
			<div>
				<div className="row">
					<h2>Sign-In</h2>
				</div>
				<div className="row">
					{signinComponent}
				</div>
				<form onSubmit={this.handleLogin}>
					<div className="row">
			        	<label><input className={input_className} ref="username" placeholder="Username"/></label>
			        </div>

			        <div className="row">
			        	<label><input className={input_className} type="password"  ref="pass" placeholder="Password"/></label><br/>
			        </div>

			        <div className="row">
			        	<button className={button_className} type="submit">Login</button>
					</div>
				</form>
				<div className="row">
					<h2>Create Account</h2>
				</div>

				<div className="row">
					{signupComponent}
				</div>
				<form onSubmit={this.handleSignup} ref="create_user_form">
			        <div className="row">
			        	<label><input className={input_className} ref="username1" placeholder="Username"/></label>
			        </div>
			        <div className="row">
			       		<label><input className={input_className} type="password" ref="pass1" placeholder="Password"/></label><br/>
			        </div>

			        <div className="row">
				        <div className="btn-group" data-toggle="buttons">
			                <label className="btn btn-default">
			                    <input type="radio" id="q1" name="user_type" value="Patient"/> Patient
			                </label> 
			                <label className="btn btn-default">
			                    <input type="radio" id="q2" name="user_type" value="Staff" /> Staff
			                </label> 

	    		                <label className="btn btn-default">
			                    <input type="radio" id="q3" name="user_type" value="Visitor" /> Visitor
			                </label> 
				        </div>
				    </div>
			        <div className="row">
			        	<button className={button_className} type="submit">Create Account</button>
					</div>
				</form>

			</div>
		);
	}


});

module.exports = Login;