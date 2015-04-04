var React = require('react');
var Router = require('react-router');
var DiaryActions = require('../actions/DiaryActions');
var ServerRequests = require('../utils/ServerRequests');
var Parse = require('../utils/ParseInit');

function getUserTypes() {
	return [
		"patient",
		"staff",
		"visitor"
	];
}


var Login = React.createClass({
	mixins: [Router.Navigation],

	statics: {
		attemptedTransition: null
	},

	getInitialState: function() {
		return {
			signinMessage: null,
			signupMessage: null,
			userTypes: getUserTypes()
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
			if(response instanceof Parse.Error){	
				this.setState({signinMessage: response.message.capitalizeFirstLetter()});
			} else {
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
		var password_confirm = this.refs.pass1_confirm.getDOMNode().value;

		if(password != password_confirm){
			this.setState({signupMessage: "Passwords don't match"});
			return;
		}

		var user_type = $("input:radio:checked").val();
		console.log($("input:radio:checked").val());

		if(!user_type){
			this.setState({signupMessage: "Pick a user type!"});
			return;
		}
		console.log("handleSignup: " + username + " " + password);

		DiaryActions.createUser({
			username: username, 
			password: password, 
			user_type: user_type
		}, function(response){
			if(response instanceof Parse.Error){	
				this.setState({signupMessage: response.message.capitalizeFirstLetter()});
			} else {
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

	render: function(){
		if(ServerRequests.loggedIn()){
			this.transitionTo('/main');
		}

		//Create components for signin/signup error messages
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

		radioButtonComponent = this.state.userTypes.map(function(userType){
			return (
                <label className="btn btn-default">
	                    <input type="radio" id="q1" name="user_type" key={userType} value={userType}/> {userType.capitalizeFirstLetter()}
                </label> 

            );

		});

		var input_className = "form-control";
		var button_className = "btn btn-lg btn-primary";
		return (
			<div>
				<div className="col-xs-12 col-sm-12 col-md-4">
					<h2>Sign-In</h2>
					{signinComponent}
					<form onSubmit={this.handleLogin}>

						<label><input className={input_className} ref="username" placeholder="Username"/></label><br/>

						<label><input className={input_className} type="password"  ref="pass" placeholder="Password"/></label><br/>

						<button className={button_className} type="submit">Login</button><br/>
						
					</form>
				</div>

				<div className="col-xs-12 col-sm-12 col-md-4">
					<h2>Create Account</h2>
					{signupComponent}
					<form onSubmit={this.handleSignup} ref="create_user_form">
				        
			        	<label><input className={input_className} ref="username1" placeholder="Username"/></label><br/>
			        
			       		<label><input className={input_className} type="password" ref="pass1" placeholder="Password"/></label><br/>
			   
			       		<label><input className={input_className} type="password" ref="pass1_confirm" placeholder="Confirm"/></label><br/>
			   
				        <div className="btn-group" data-toggle="buttons">
				        	{radioButtonComponent}
				        </div> <br/>
				    
			        	<button className={button_className} type="submit">Create Account</button><br/>
						
					</form>
				</div>

			</div>
		);
	}


});

module.exports = Login;